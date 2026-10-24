/**
 * 정보처리기사 실기 CBT 애플리케이션 메인 컨트롤러
 * - 2020~2026년 15개 회차 기출 및 언어별/테마별 특화 세트
 * - 동적 배점 계산 및 주관식 다중 빈칸 부분 점수(Partial Credit) 지원
 * - 완벽한 오답 복습 모드 (재도전 정복률 및 누적 종합 점수 반영)
 * - CBT 250×250 캔버스 메모장 (문제별 저장/복원)
 * - 실기 핵심 요약 & 학습 가이드
 */

(function () {
  'use strict';

  // App State
  let currentRoundId = '2026_1';
  let fullExamData = null;
  let activeQuestions = [];
  let currentQIndex = 0; // 0-based
  let userAnswers = {}; // { [qId]: answer string or object }
  let gradedResults = {}; // { [qId]: { isCorrect, scoreRatio, ... } }
  let examMode = 'practice'; // 'practice' | 'real'
  let isRetakeMode = false;

  let timer = null;
  let memoPad = null;

  // DOM Elements
  const examSelectDropdown = document.getElementById('examSelect');
  const examPassRateEl = document.getElementById('examPassRate');
  const examDifficultyEl = document.getElementById('examDifficulty');
  const timerDisplayEl = document.getElementById('timerDisplay');
  const btnToggleTimer = document.getElementById('btnToggleTimer');
  const modePracticeBtn = document.getElementById('modePractice');
  const modeRealBtn = document.getElementById('modeReal');
  const btnSubmitExam = document.getElementById('btnSubmitExam');
  const btnResetExam = document.getElementById('btnResetExam');
  const questionBoxesContainer = document.getElementById('questionBoxesContainer');

  // Retake Banner
  const retakeBanner = document.getElementById('retakeBanner');
  const retakeBannerText = document.getElementById('retakeBannerText');
  const btnExitRetake = document.getElementById('btnExitRetake');

  // Problem Elements
  const qNumBadge = document.getElementById('qNumBadge');
  const qCategoryBadge = document.getElementById('qCategoryBadge');
  const qPointsBadge = document.getElementById('qPointsBadge');
  const qPromptEl = document.getElementById('questionPrompt');
  const qPassageBox = document.getElementById('passageBox');
  const qCodeContainer = document.getElementById('codeContainer');
  const qCodeBlock = document.getElementById('codeBlock');
  const qCodeLang = document.getElementById('codeLang');
  const answerInputGroup = document.getElementById('answerInputGroup');
  const btnCheckAnswer = document.getElementById('btnCheckAnswer');
  const answerStatusMsg = document.getElementById('answerStatusMsg');

  // Explanation Elements
  const explanationCard = document.getElementById('explanationCard');
  const expCorrectAnswer = document.getElementById('expCorrectAnswer');
  const expTrapBox = document.getElementById('expTrapBox');
  const expTraceContainer = document.getElementById('expTraceContainer');
  const expTraceTable = document.getElementById('expTraceTable');
  const expBodyText = document.getElementById('expBodyText');

  // companyTest Memo Pad Elements
  const memoCanvas = document.getElementById('memoCanvas');
  const btnClear = document.getElementById('btnClear');

  // Score Modal Elements
  const scoreModal = document.getElementById('scoreModal');
  const scoreBanner = document.getElementById('scoreBanner');
  const scoreTitle = document.getElementById('scoreTitle');
  const scoreBigNumber = document.getElementById('scoreBigNumber');
  const scoreJudgment = document.getElementById('scoreJudgment');
  const progStatScore = document.getElementById('progStatScore');
  const dbStatScore = document.getElementById('dbStatScore');
  const theoryStatScore = document.getElementById('theoryStatScore');
  const reviewGrid = document.getElementById('reviewGrid');
  const btnCloseModal = document.getElementById('btnCloseModal');
  const btnRetakeWrong = document.getElementById('btnRetakeWrong');
  const btnRestartFull = document.getElementById('btnRestartFull');
  const btnViewAllExp = document.getElementById('btnViewAllExp');

  // Cheatsheet Modal Elements
  const btnOpenCheatsheet = document.getElementById('btnOpenCheatsheet');
  const cheatsheetModal = document.getElementById('cheatsheetModal');
  const btnCloseCheatsheet = document.getElementById('btnCloseCheatsheet');
  const btnCloseCheatsheetBottom = document.getElementById('btnCloseCheatsheetBottom');
  const csTabs = document.getElementById('csTabs');
  const csBody = document.getElementById('csBody');

  // Init App
  function init() {
    if (!examSelectDropdown) return;
    initExamCatalog();
    initMemoPad();
    initTimer();
    loadExam(currentRoundId);
    bindEvents();
  }

  function initExamCatalog() {
    examSelectDropdown.innerHTML = '';
    (window.EXAM_CATALOG || []).forEach(cat => {
      const opt = document.createElement('option');
      opt.value = cat.id;
      opt.textContent = `${cat.title} [${cat.questionCount}문항]`;
      examSelectDropdown.appendChild(opt);
    });
    examSelectDropdown.value = currentRoundId;
  }

  function initMemoPad() {
    if (memoCanvas && typeof createMemoPad === 'function') {
      memoPad = createMemoPad(memoCanvas, btnClear);
    }
  }


  function initTimer() {
    timer = new ExamTimer({
      displayEl: timerDisplayEl,
      totalSeconds: 150 * 60, // 2시간 30분
      onTimeUp: () => {
        alert('시험 시간이 종료되었습니다! 자동 채점을 진행합니다.');
        submitExam();
      }
    });
    timer.start();
  }

  function setExamMode(newMode) {
    examMode = newMode;
    if (newMode === 'real') {
      modePracticeBtn.style.display = 'none';
      modeRealBtn.style.display = '';
      modeRealBtn.classList.add('active');
      modePracticeBtn.classList.remove('active');
    } else {
      modeRealBtn.style.display = 'none';
      modePracticeBtn.style.display = '';
      modePracticeBtn.classList.add('active');
      modeRealBtn.classList.remove('active');
    }
    renderCurrentQuestion();
  }

  function getPointPerQuestion() {
    const totalCount = (isRetakeMode && fullExamData && fullExamData.questions)
      ? (fullExamData.questions.length || 20)
      : (activeQuestions.length || 20);
    if (totalCount === 20) return 5;
    if (totalCount === 25) return 4;
    return Number((100 / totalCount).toFixed(1));
  }

  function loadExam(roundId, retainAnswers = false) {
    currentRoundId = roundId;
    const cat = (window.EXAM_CATALOG || []).find(c => c.id === roundId);
    if (cat) {
      examPassRateEl.textContent = cat.passRate || '-';
      examDifficultyEl.textContent = cat.difficulty || '-';
    }

    fullExamData = (window.EXAM_ROUNDS && window.EXAM_ROUNDS[roundId]) || null;
    if (!fullExamData || !fullExamData.questions) {
      alert(`해당 회차(${roundId}) 데이터를 불러올 수 없습니다.`);
      return;
    }

    activeQuestions = [...fullExamData.questions];
    currentQIndex = 0;
    isRetakeMode = false;
    retakeBanner.style.display = 'none';

    renderQuestionBoxes();

    if (!retainAnswers) {
      userAnswers = {};
      gradedResults = {};
      if (memoPad) memoPad.clearAll();
      setExamMode('practice');
    } else {
      renderCurrentQuestion();
    }
  }

  function getCategoryClass(cat) {
    if (!cat) return 'theory';
    const c = cat.toLowerCase();
    if (c === 'c') return 'c';
    if (c === 'java') return 'java';
    if (c === 'python') return 'python';
    if (c === 'sql') return 'sql';
    return 'theory';
  }

  function renderQuestionBoxes() {
    questionBoxesContainer.innerHTML = '';
    activeQuestions.forEach((q, idx) => {
      const box = document.createElement('div');
      box.className = 'q-box';
      box.dataset.index = idx;
      box.textContent = idx + 1;

      if (isRetakeMode) {
        box.title = `문항 ${idx + 1} (원래 ${q.id}번 문항)`;
      }

      // Status
      if (idx === currentQIndex) box.classList.add('current');
      const ans = userAnswers[q.id];
      if (ans !== undefined && ans !== '') {
        if (typeof ans === 'object') {
          if (Object.values(ans).some(v => v && String(v).trim())) box.classList.add('answered');
        } else if (String(ans).trim()) {
          box.classList.add('answered');
        }
      }

      if (gradedResults[q.id]) {
        if (gradedResults[q.id].isCorrect) {
          box.classList.add('correct');
        } else if (gradedResults[q.id].scoreRatio > 0) {
          box.classList.add('partial');
        } else {
          box.classList.add('incorrect');
        }
      }

      box.addEventListener('click', () => {
        if (currentQIndex !== idx) {
          if (memoPad) memoPad.save(currentQIndex);
          saveCurrentInput();
          currentQIndex = idx;
          renderCurrentQuestion();
        }
      });

      questionBoxesContainer.appendChild(box);
    });
  }

  function updateQuestionBoxesUI() {
    const boxes = questionBoxesContainer.querySelectorAll('.q-box');
    boxes.forEach((box, idx) => {
      const q = activeQuestions[idx];
      if (!q) return;
      box.classList.remove('current', 'answered', 'correct', 'incorrect', 'partial');
      if (idx === currentQIndex) box.classList.add('current');

      const ans = userAnswers[q.id];
      if (ans) {
        if (typeof ans === 'object') {
          if (Object.values(ans).some(v => v && String(v).trim())) box.classList.add('answered');
        } else if (String(ans).trim()) {
          box.classList.add('answered');
        }
      }

      if (gradedResults[q.id]) {
        if (gradedResults[q.id].isCorrect) {
          box.classList.add('correct');
        } else if (gradedResults[q.id].scoreRatio > 0) {
          box.classList.add('partial');
        } else {
          box.classList.add('incorrect');
        }
      }
    });
  }

  function renderCurrentQuestion() {
    if (!activeQuestions[currentQIndex]) return;
    const q = activeQuestions[currentQIndex];
    const pt = getPointPerQuestion();

    // Header Badges
    if (isRetakeMode) {
      qNumBadge.textContent = `복습 ${currentQIndex + 1} / ${activeQuestions.length} (원래 ${q.id}번)`;
    } else {
      qNumBadge.textContent = `문항 ${currentQIndex + 1} / ${activeQuestions.length}`;
    }

    qCategoryBadge.className = `badge-category ${getCategoryClass(q.category)}`;
    qCategoryBadge.textContent = q.category ? `${q.category}` : '단답형';
    qPointsBadge.textContent = `배점 ${pt}점`;

    // Prompt
    qPromptEl.textContent = q.prompt || '';

    // Passage (Markdown table / text)
    if (q.passage && q.passage.trim()) {
      qPassageBox.style.display = 'block';
      qPassageBox.innerHTML = renderMarkdownPassage(q.passage);
    } else {
      qPassageBox.style.display = 'none';
      qPassageBox.innerHTML = '';
    }

    // Code Block
    if (q.code && q.code.trim()) {
      qCodeContainer.style.display = 'block';
      qCodeLang.textContent = (q.category || 'Code').toUpperCase();
      renderFormattedCode(q.code, q.category);
    } else {
      qCodeContainer.style.display = 'none';
    }

    // Render Answer Input
    renderAnswerInput(q);

    // Render Explanation if available
    renderExplanation(q);

    // Restore Memo for Current Question
    if (memoPad) memoPad.restore(currentQIndex);

    updateQuestionBoxesUI();
  }

  /**
   * 마크다운 표 및 지문 렌더러 (유효한 DOM 구조 보장)
   */
  function renderMarkdownPassage(text) {
    if (!text) return '';
    const lines = text.trim().split('\n');
    let html = '';
    let tableBuffer = [];

    const flushTable = () => {
      if (tableBuffer.length === 0) return;
      html += '<table class="trace-table" style="margin: 10px 0;">';
      let isHeader = true;

      tableBuffer.forEach(line => {
        const trimmed = line.trim();
        if (trimmed.includes('---')) return; // 구분선 스킵
        const cells = trimmed
          .replace(/\\\|/g, '\uE000')
          .split('|')
          .map(c => c.replace(/\uE000/g, '|').trim())
          .filter((_, i, a) => i > 0 && i < a.length - 1);

        if (cells.length > 0) {
          html += '<tr>';
          cells.forEach(c => {
            const tag = isHeader ? 'th' : 'td';
            const cellHtml = escapeHtml(c).replace(/&lt;br\s*\/?&gt;/gi, '<br>');
            html += `<${tag}>${cellHtml}</${tag}>`;
          });
          html += '</tr>';
          if (isHeader) isHeader = false;
        }
      });

      html += '</table>';
      tableBuffer = [];
    };

    lines.forEach(line => {
      const trimmed = line.trim();
      if (trimmed.startsWith('|') && trimmed.endsWith('|')) {
        tableBuffer.push(trimmed);
      } else {
        flushTable();
        if (trimmed) {
          const lineHtml = escapeHtml(trimmed).replace(/&lt;br\s*\/?&gt;/gi, '<br>');
          html += `<div style="margin-bottom: 6px; font-weight: 500;">${lineHtml}</div>`;
        }
      }
    });

    flushTable();
    return html;
  }

  function renderFormattedCode(rawCode, category) {
    const targetEl = qCodeBlock || document.getElementById('codeBlock');
    if (!targetEl) return;
    const lines = String(rawCode || '').replace(/\r\n/g, '\n').replace(/\r/g, '\n').split('\n');
    let html = '';
    let inBlockComment = false;

    lines.forEach((line, idx) => {
      const lineNum = idx + 1;
      const res = highlightSyntaxLine(line, category, inBlockComment);
      inBlockComment = res.inBlockComment;
      html += `<div class="code-line"><span class="code-line-num">${lineNum}</span><span class="code-line-content">${res.html || ' '}</span></div>`;
    });
    targetEl.innerHTML = html;
  }

  function highlightSyntax(rawLine, category) {
    return highlightSyntaxLine(rawLine, category, false).html;
  }

  function highlightSyntaxLine(rawLine, category, inBlockComment = false) {
    if (rawLine === null || rawLine === undefined) {
      return { html: '', inBlockComment: Boolean(inBlockComment) };
    }
    const rawStr = String(rawLine);
    const cat = (category || '').toLowerCase();
    const len = rawStr.length;
    let out = '';

    const esc = escapeHtml;
    let startIdx = 0;

    // Handle ongoing multi-line block comment
    if (inBlockComment) {
      const closeIdx = rawStr.indexOf('*/');
      if (closeIdx === -1) {
        return { html: `<span class="c-com">${esc(rawStr)}</span>`, inBlockComment: true };
      } else {
        out += `<span class="c-com">${esc(rawStr.slice(0, closeIdx + 2))}</span>`;
        startIdx = closeIdx + 2;
        inBlockComment = false;
        if (startIdx >= len) {
          return { html: out, inBlockComment: false };
        }
      }
    }

    let remaining = rawStr.slice(startIdx);

    // 1. C/C++ Preprocessor (#include, #define)
    if ((cat !== 'python' && cat !== 'py') && startIdx === 0 && /^\s*#(include|define)\b/.test(remaining)) {
      const match = remaining.match(/^(\s*)(#(?:include|define))(\s*)(<[^>]+>|"[^"]+")?(.*)$/);
      if (match) {
        out += esc(match[1]);
        out += `<span class="c-kw">${esc(match[2])}</span>`;
        out += esc(match[3]);
        if (match[4]) {
          out += `<span class="c-str">${esc(match[4])}</span>`;
        }
        if (match[5] && match[5].trim()) {
          remaining = match[5];
        } else {
          if (match[5]) out += esc(match[5]);
          return { html: out, inBlockComment: false };
        }
      }
    }

    // Token regex pattern:
    // 1: Comments (C/Java: //, Python: #, SQL: --)
    // 2: Block comment start /* ... */ or /* to end of line
    // 3: Strings ("..." or '...')
    // 4: Numbers (integers, floats, hex)
    // 5: Words (keywords, types, functions)
    let commentPattern = '\\/\\/.*';
    let blockCommentPattern = '\\/\\*[\\s\\S]*?\\*\\/|\\/\\*.*';
    if (cat === 'python' || cat === 'py') {
      commentPattern = '#.*';
      blockCommentPattern = '"""[\\s\\S]*?"""|\'\'\'[\\s\\S]*?\'\'\'';
    } else if (cat === 'sql') {
      commentPattern = '--.*';
    }

    const tokenRegex = new RegExp(
      `(${commentPattern})|(${blockCommentPattern})|("(?:\\\\.|[^"\\\\])*"|'(?:\\\\.|[^'\\\\])*')|(\\b0x[0-9a-fA-F]+\\b|\\b\\d+(?:\\.\\d+)?\\b)|(\\b[a-zA-Z_][a-zA-Z0-9_]*\\b)`,
      'g'
    );

    const KEYWORDS = new Set([
      'int','float','double','char','void','struct','public','class','static','return',
      'if','else','while','for','do','switch','case','break','continue','default','import',
      'interface','extends','implements','new','try','catch','finally','throw','throws',
      'def','lambda','in','not','is','from','as','elif','None','self','super','this',
      'true','false','null','TRUE','FALSE','NULL',
      'sizeof','typedef','const','final','boolean','byte','short','long','unsigned','signed',
      'len','range','print','input','pass','yield','raise','except','with',
      'select','from','where','group','by','having','order','join','inner','left','right',
      'outer','on','insert','into','values','update','set','delete','create','alter','drop',
      'table','view','index','count','sum','avg','max','min','rank','dense_rank','over'
    ]);

    const TYPES = new Set([
      'String','Integer','Boolean','Double','Float','List','ArrayList','Map','HashMap','Scanner','System','Object',
      'Exception','Thread','Runnable'
    ]);

    let lastIdx = 0;
    let m;
    while ((m = tokenRegex.exec(remaining)) !== null) {
      if (m.index > lastIdx) {
        out += esc(remaining.slice(lastIdx, m.index));
      }
      lastIdx = tokenRegex.lastIndex;

      if (m[1]) {
        out += `<span class="c-com">${esc(m[1])}</span>`;
      } else if (m[2]) {
        out += `<span class="c-com">${esc(m[2])}</span>`;
        if (m[2].startsWith('/*') && !m[2].endsWith('*/')) {
          inBlockComment = true;
        }
      } else if (m[3]) {
        out += `<span class="c-str">${esc(m[3])}</span>`;
      } else if (m[4]) {
        out += `<span class="c-num">${esc(m[4])}</span>`;
      } else if (m[5]) {
        const word = m[5];
        const lower = word.toLowerCase();
        if (KEYWORDS.has(lower) || KEYWORDS.has(word)) {
          out += `<span class="c-kw">${esc(word)}</span>`;
        } else if (TYPES.has(word)) {
          out += `<span class="c-type">${esc(word)}</span>`;
        } else if (/^\s*\(/.test(remaining.slice(lastIdx))) {
          out += `<span class="c-fn">${esc(word)}</span>`;
        } else {
          out += esc(word);
        }
      }
    }

    if (lastIdx < remaining.length) {
      out += esc(remaining.slice(lastIdx));
    }

    return { html: out, inBlockComment };
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderAnswerInput(q) {
    answerInputGroup.innerHTML = '';
    const saved = userAnswers[q.id];

    if (q.answerType === 'multi_blank' && q.multiAnswers) {
      const blanks = Object.keys(q.multiAnswers);
      blanks.forEach(bKey => {
        const row = document.createElement('div');
        row.className = 'answer-row';

        const label = document.createElement('span');
        label.className = 'answer-blank-label';
        label.textContent = `(${bKey})`;

        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'exam-input-text';
        input.dataset.blankKey = bKey;
        if (saved && typeof saved === 'object' && saved[bKey]) {
          input.value = saved[bKey];
        }

        input.addEventListener('input', () => {
          if (!userAnswers[q.id] || typeof userAnswers[q.id] !== 'object') {
            userAnswers[q.id] = {};
          }
          userAnswers[q.id][bKey] = input.value;
          updateQuestionBoxesUI();
        });

        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            checkCurrentAnswer();
          }
        });

        row.appendChild(label);
        row.appendChild(input);
        answerInputGroup.appendChild(row);
      });
    } else {
      const input = document.createElement('input');
      input.type = 'text';
      input.className = 'exam-input-text';
      if (saved && typeof saved === 'string') {
        input.value = saved;
      }

      input.addEventListener('input', () => {
        userAnswers[q.id] = input.value;
        updateQuestionBoxesUI();
      });

      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          checkCurrentAnswer();
        }
      });

      answerInputGroup.appendChild(input);
    }

    // Status Message & Mode
    if (examMode === 'real') {
      btnCheckAnswer.style.display = 'none';
      answerStatusMsg.textContent = '실전 모드 진행 중 (답안 자동 저장)';
      answerStatusMsg.className = 'answer-status-msg';
    } else {
      btnCheckAnswer.style.display = 'inline-block';
      const g = gradedResults[q.id];
      if (g) {
        const pt = getPointPerQuestion();
        if (g.isCorrect) {
          answerStatusMsg.textContent = `✓ 정답입니다! (+${pt}점)`;
          answerStatusMsg.className = 'answer-status-msg status-correct';
        } else if (g.scoreRatio > 0) {
          const earned = Number((pt * g.scoreRatio).toFixed(1));
          answerStatusMsg.textContent = `△ 부분 정답입니다! (${g.correctCount}/${g.totalCount} 맞힘, +${earned}점)`;
          answerStatusMsg.className = 'answer-status-msg status-partial';
        } else {
          answerStatusMsg.textContent = '✕ 오답입니다. 아래 해설을 확인하세요.';
          answerStatusMsg.className = 'answer-status-msg status-incorrect';
        }
      } else {
        answerStatusMsg.textContent = '';
      }
    }
  }

  function saveCurrentInput() {
    const q = activeQuestions[currentQIndex];
    if (!q) return;

    if (q.answerType === 'multi_blank') {
      const inputs = answerInputGroup.querySelectorAll('input[data-blank-key]');
      const obj = {};
      inputs.forEach(inp => {
        obj[inp.dataset.blankKey] = inp.value;
      });
      userAnswers[q.id] = obj;
    } else {
      const input = answerInputGroup.querySelector('input');
      if (input) {
        userAnswers[q.id] = input.value;
      }
    }
  }

  function checkCurrentAnswer() {
    saveCurrentInput();
    const q = activeQuestions[currentQIndex];
    if (!q) return;

    const userAns = userAnswers[q.id];
    const grade = Grader.gradeQuestion(userAns, q);
    gradedResults[q.id] = grade;

    const pt = getPointPerQuestion();
    if (grade.isCorrect) {
      answerStatusMsg.textContent = `✓ 정답입니다! (+${pt}점)`;
      answerStatusMsg.className = 'answer-status-msg status-correct';
    } else if (grade.scoreRatio > 0) {
      const earned = Number((pt * grade.scoreRatio).toFixed(1));
      answerStatusMsg.textContent = `△ 부분 정답입니다! (${grade.correctCount}/${grade.totalCount} 맞힘, +${earned}점)`;
      answerStatusMsg.className = 'answer-status-msg status-partial';
    } else {
      answerStatusMsg.textContent = '✕ 오답입니다. 해설 및 변수 추적표를 확인하세요.';
      answerStatusMsg.className = 'answer-status-msg status-incorrect';
    }

    renderExplanation(q, true);
    updateQuestionBoxesUI();
  }

  function renderExplanation(q, forceShow = false) {
    const shouldShow = forceShow || (examMode === 'practice' && gradedResults[q.id]);

    if (!shouldShow) {
      explanationCard.classList.remove('show');
      return;
    }

    explanationCard.classList.add('show');
    expCorrectAnswer.innerHTML = `<strong>모범 답안:</strong> ${escapeHtml(q.answer)}`;

    // Trap Point
    if (q.trapPoint) {
      expTrapBox.style.display = 'block';
      expTrapBox.innerHTML = `<strong>주의 포인트: </strong>${escapeHtml(q.trapPoint)}`;
    } else {
      expTrapBox.style.display = 'none';
    }

    // Trace Table
    if (q.traceTable && q.traceTable.headers && q.traceTable.rows) {
      expTraceContainer.style.display = 'block';
      let tableHtml = '<thead><tr>';
      q.traceTable.headers.forEach(h => {
        tableHtml += `<th>${escapeHtml(h)}</th>`;
      });
      tableHtml += '</tr></thead><tbody>';

      q.traceTable.rows.forEach(row => {
        tableHtml += '<tr>';
        row.forEach(cell => {
          tableHtml += `<td>${escapeHtml(cell)}</td>`;
        });
        tableHtml += '</tr>';
      });
      tableHtml += '</tbody>';
      expTraceTable.innerHTML = tableHtml;
    } else {
      expTraceContainer.style.display = 'none';
    }

    // Explanation Body
    expBodyText.textContent = q.explanation || '등록된 상세 해설이 없습니다.';
  }

  function submitExam() {
    if (timer) {
      timer.pause();
      if (btnToggleTimer) btnToggleTimer.textContent = '▶';
    }
    saveCurrentInput();
    if (memoPad) memoPad.save(currentQIndex);

    const pt = getPointPerQuestion();
    let totalScore = 0;
    let correctCount = 0;
    const catStats = {
      prog: { total: 0, correct: 0 },
      db: { total: 0, correct: 0 },
      theory: { total: 0, correct: 0 }
    };

    activeQuestions.forEach(q => {
      const userAns = userAnswers[q.id];
      const grade = Grader.gradeQuestion(userAns, q);
      gradedResults[q.id] = grade;

      const isCode = ['C', 'Java', 'Python'].includes(q.category);
      const isDb = q.category === 'SQL';

      if (isCode) catStats.prog.total++;
      else if (isDb) catStats.db.total++;
      else catStats.theory.total++;

      if (grade.isCorrect) {
        totalScore += pt;
        correctCount++;
        if (isCode) catStats.prog.correct++;
        else if (isDb) catStats.db.correct++;
        else catStats.theory.correct++;
      } else if (grade.scoreRatio > 0) {
        totalScore += (pt * grade.scoreRatio);
      }
    });

    totalScore = Number(totalScore.toFixed(1));
    const passCutoff = fullExamData.cutoffPoints || 60;

    // Check if in Retake Mode
    if (isRetakeMode) {
      scoreTitle.textContent = "오답 복습 성적";
      scoreBigNumber.textContent = `${correctCount} / ${activeQuestions.length} 문항 정답`;
      if (correctCount === activeQuestions.length) {
        scoreBanner.className = 'score-banner pass';
        scoreJudgment.textContent = `🎉 축하합니다! 모든 오답 문항을 정복하셨습니다.`;
      } else {
        scoreBanner.className = 'score-banner fail';
        scoreJudgment.textContent = `💧 아직 ${activeQuestions.length - correctCount}문항이 남아있습니다. 다시 복습해보세요!`;
      }
    } else {
      scoreTitle.textContent = "최종 취득 점수";
      scoreBigNumber.textContent = `${totalScore}점`;
      const isPass = totalScore >= passCutoff;
      if (isPass) {
        scoreBanner.className = 'score-banner pass';
        scoreJudgment.textContent = `🎉 합격권입니다! (기준: ${passCutoff}점 이상, 정답 ${correctCount}/${activeQuestions.length}문항)`;
      } else {
        scoreBanner.className = 'score-banner fail';
        scoreJudgment.textContent = `💧 불합격권입니다. (기준: ${passCutoff}점 이상, 정답 ${correctCount}/${activeQuestions.length}문항 - 오답 복습 권장)`;
      }
    }

    progStatScore.textContent = `${catStats.prog.correct} / ${catStats.prog.total}`;
    dbStatScore.textContent = `${catStats.db.correct} / ${catStats.db.total}`;
    theoryStatScore.textContent = `${catStats.theory.correct} / ${catStats.theory.total}`;

    // Review Grid
    reviewGrid.innerHTML = '';
    activeQuestions.forEach((q, idx) => {
      const g = gradedResults[q.id] || { isCorrect: false, scoreRatio: 0, userAnswer: '(미입력)', correctAnswer: q.answer };
      const item = document.createElement('div');

      let statusMark = 'X';
      let statusClass = 'fail';

      if (g.isCorrect) {
        statusMark = 'O';
        statusClass = 'pass';
      } else if (g.scoreRatio > 0) {
        statusMark = '△';
        statusClass = 'partial';
      }

      item.className = `review-item ${statusClass}`;
      item.textContent = `${idx + 1}번 ${statusMark}`;
      item.title = `문항 ${idx + 1} (${q.category}) | 내 답: ${g.userAnswer} | 정답: ${g.correctAnswer}`;

      item.addEventListener('click', () => {
        scoreModal.classList.remove('show');
        if (memoPad) memoPad.save(currentQIndex);
        currentQIndex = idx;
        renderCurrentQuestion();
        renderExplanation(q, true);
      });

      reviewGrid.appendChild(item);
    });

    scoreModal.classList.add('show');
    updateQuestionBoxesUI();
    renderCurrentQuestion();
  }

  function retakeIncorrectOnly() {
    const wrongQs = activeQuestions.filter(q => {
      const g = gradedResults[q.id];
      return !g || !g.isCorrect;
    });

    if (wrongQs.length === 0) {
      alert('모든 문제를 맞히셨습니다! 틀린 문제가 없습니다 🎉');
      return;
    }

    if (!confirm(`틀린 ${wrongQs.length}문항만 다시 푸시겠습니까?`)) return;

    activeQuestions = [...wrongQs];
    currentQIndex = 0;
    isRetakeMode = true;

    // Reset user answers for these questions
    wrongQs.forEach(q => {
      delete userAnswers[q.id];
      delete gradedResults[q.id];
    });

    retakeBanner.style.display = 'flex';
    retakeBannerText.textContent = `오답 복습 모드 진행 중: 틀린 ${wrongQs.length}문항 재응시 중`;

    if (memoPad) memoPad.clearAll();
    scoreModal.classList.remove('show');
    renderQuestionBoxes();
    setExamMode('practice');
  }

  function exitRetakeMode() {
    if (confirm('오답 복습 모드를 종료하고 전체 회차로 돌아가시겠습니까?')) {
      activeQuestions = [...fullExamData.questions];
      currentQIndex = 0;
      isRetakeMode = false;
      retakeBanner.style.display = 'none';
      if (memoPad) memoPad.clearAll();
      renderQuestionBoxes();
      setExamMode('practice');
    }
  }

  // Cheatsheet Modal Methods
  function openCheatsheet(tabKey = 'part1') {
    renderCheatsheetTab(tabKey);
    cheatsheetModal.classList.add('show');
  }

  function closeCheatsheet() {
    cheatsheetModal.classList.remove('show');
  }

  function highlightBrackets(text) {
    if (!text) return '';
    // Replace ASCII arrow or HTML-escaped arrow with clean unicode arrow
    let res = String(text).replace(/(?:->|-&gt;)/g, '→');
    // Highlight bracketed mnemonics like [추빌팩프싱], [자스제외부내], [우순교절시논우], [원부이결다조], [약함(좋음) → 강함(나쁨)]
    // Only wrap when bracket contains Korean letters to preserve code brackets like [1, 2, 3]
    res = res.replace(/\[([가-힣\s/()→\-]+)\]/g, '<span class="cs-mnemonic-pill">[$1]</span>');
    return res;
  }

  function formatCheatsheetContent(rawContent) {
    if (!rawContent) return '';
    const lines = String(rawContent)
      .split('\n')
      .map(l => l.trimEnd())
      .filter(l => l.trim().length > 0);

    return lines.map(line => {
      const trimmed = line.trim();

      // 1) 암기 공식 전용 배너
      if (/^•?\s*암기\s*공식\s*:\s*/i.test(trimmed)) {
        const body = trimmed.replace(/^•?\s*암기\s*공식\s*:\s*/i, '');
        return `
          <div class="cs-mnemonic-banner">
            <span class="cs-mnemonic-tag">암기 공식</span>
            <div class="cs-mnemonic-text">${highlightBrackets(body)}</div>
          </div>
        `;
      }

      // 2) 요약 결론 / 하단 콜아웃: starts with "👉"
      if (trimmed.startsWith('👉')) {
        const body = trimmed.replace(/^👉\s*/, '');
        return `
          <div class="cs-summary-callout">
            <span class="cs-summary-icon">👉</span>
            <div class="cs-summary-text">${highlightBrackets(body)}</div>
          </div>
        `;
      }

      // 3) 번호형 단계 (1. ~ 7.)
      const numMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
      if (numMatch) {
        return `
          <div class="cs-item-row cs-numbered-row">
            <span class="cs-step-badge">${numMatch[1]}</span>
            <div class="cs-item-text">${highlightBrackets(numMatch[2])}</div>
          </div>
        `;
      }

      // 4) 들여쓰기 서브 항목 (starts with "  -" or "- ")
      if (/^-\s+/.test(trimmed) || /^\s+-\s+/.test(line)) {
        const body = trimmed.replace(/^-\s+/, '');
        return `
          <div class="cs-subitem-row">
            <span class="cs-sub-dot">–</span>
            <div class="cs-item-text">${highlightBrackets(body)}</div>
          </div>
        `;
      }

      // 5) 일반 불릿 (• ...)
      if (trimmed.startsWith('•')) {
        const body = trimmed.replace(/^•\s*/, '');
        return `
          <div class="cs-item-row cs-bullet-row">
            <span class="cs-bullet-dot"></span>
            <div class="cs-item-text">${highlightBrackets(body)}</div>
          </div>
        `;
      }

      // 6) 기타 일반 텍스트 행
      return `
        <div class="cs-item-row cs-plain-row">
          <div class="cs-item-text">${highlightBrackets(trimmed)}</div>
        </div>
      `;
    }).join('');
  }

  function renderCheatsheetTab(tabKey) {
    const tabs = csTabs.querySelectorAll('.cs-tab-btn');
    tabs.forEach(t => {
      t.classList.toggle('active', t.dataset.tab === tabKey);
    });

    const data = window.CHEATSHEET_DATA && window.CHEATSHEET_DATA[tabKey];
    if (!data) {
      csBody.innerHTML = '<div style="padding:20px; color:#64748b;">요약 데이터를 불러올 수 없습니다.</div>';
      return;
    }

    let html = `
      <div class="cs-tab-header">
        <h3 class="cs-tab-title">${escapeHtml(data.title)}</h3>
        <span class="badge-category theory">${escapeHtml(data.category)}</span>
      </div>
    `;

    (data.sections || []).forEach(sec => {
      const headingText = highlightBrackets(escapeHtml(sec.heading));
      html += `
        <div class="cs-section-card">
          <div class="cs-sec-header">
            <h4 class="cs-sec-heading">${headingText}</h4>
          </div>
          <div class="cs-sec-content">${formatCheatsheetContent(sec.content)}</div>
        </div>
      `;
    });

    csBody.innerHTML = html;
  }

  function bindEvents() {
    examSelectDropdown.addEventListener('change', (e) => {
      if (confirm('시험 회차를 변경하시겠습니까? 현재 풀던 답안은 초기화됩니다.')) {
        loadExam(e.target.value);
        if (timer) {
          timer.reset();
          timer.start();
          if (btnToggleTimer) btnToggleTimer.textContent = '⏸';
        }
      } else {
        examSelectDropdown.value = currentRoundId;
      }
    });

    modePracticeBtn.addEventListener('click', () => {
      setExamMode('real');
    });

    modeRealBtn.addEventListener('click', () => {
      setExamMode('practice');
    });

    btnToggleTimer.addEventListener('click', () => {
      const running = timer.toggle();
      btnToggleTimer.textContent = running ? '⏸' : '▶';
    });

    btnCheckAnswer.addEventListener('click', checkCurrentAnswer);
    btnSubmitExam.addEventListener('click', () => {
      if (confirm('시험을 종료하고 채점하시겠습니까?')) {
        submitExam();
      }
    });

    btnResetExam.addEventListener('click', () => {
      if (confirm('현재 회차의 모든 답안과 채점 결과를 초기화하시겠습니까?')) {
        if (memoPad) memoPad.clearAll();
        loadExam(currentRoundId, false);
        if (timer) {
          timer.reset();
          timer.start();
          if (btnToggleTimer) btnToggleTimer.textContent = '⏸';
        }
      }
    });

    // Score Modal buttons
    btnCloseModal.addEventListener('click', () => {
      scoreModal.classList.remove('show');
      // 시험 종료 후 모달을 닫아도 해설을 열람할 수 있도록 연습 모드로 전환
      setExamMode('practice');
    });

    btnRetakeWrong.addEventListener('click', retakeIncorrectOnly);

    btnRestartFull.addEventListener('click', () => {
      scoreModal.classList.remove('show');
      if (memoPad) memoPad.clearAll();
      setExamMode('practice');
      loadExam(currentRoundId, false);
      if (timer) {
        timer.reset();
        timer.start();
        if (btnToggleTimer) btnToggleTimer.textContent = '⏸';
      }
    });

    btnViewAllExp.addEventListener('click', () => {
      scoreModal.classList.remove('show');
      setExamMode('practice');
      const q = activeQuestions[currentQIndex];
      if (q) renderExplanation(q, true);
    });

    // Retake Banner Exit
    btnExitRetake.addEventListener('click', exitRetakeMode);

    // Cheatsheet Modal
    btnOpenCheatsheet.addEventListener('click', () => openCheatsheet('part1'));
    btnCloseCheatsheet.addEventListener('click', closeCheatsheet);
    btnCloseCheatsheetBottom.addEventListener('click', closeCheatsheet);
    cheatsheetModal.addEventListener('click', (e) => {
      if (e.target === cheatsheetModal) closeCheatsheet();
    });

    csTabs.addEventListener('click', (e) => {
      const btn = e.target.closest('.cs-tab-btn');
      if (btn && btn.dataset.tab) {
        renderCheatsheetTab(btn.dataset.tab);
      }
    });

    scoreModal.addEventListener('click', (e) => {
      if (e.target === scoreModal) {
        btnCloseModal.click();
      }
    });

    // Keyboard navigation (Alt+Left, Alt+Right, Escape)
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (cheatsheetModal && cheatsheetModal.classList.contains('show')) {
          closeCheatsheet();
        } else if (scoreModal && scoreModal.classList.contains('show')) {
          btnCloseModal.click();
        }
      } else if (e.altKey && e.key === 'ArrowLeft') {
        e.preventDefault();
        if (currentQIndex > 0) {
          if (memoPad) memoPad.save(currentQIndex);
          saveCurrentInput();
          currentQIndex--;
          renderCurrentQuestion();
        }
      } else if (e.altKey && e.key === 'ArrowRight') {
        e.preventDefault();
        if (currentQIndex < activeQuestions.length - 1) {
          if (memoPad) memoPad.save(currentQIndex);
          saveCurrentInput();
          currentQIndex++;
          renderCurrentQuestion();
        }
      }
    });
  }

  // Expose Highlighter utilities for testing and external consumption
  window.CodeHighlighter = {
    renderFormattedCode,
    highlightSyntax,
    highlightSyntaxLine
  };

  // Start on DOMContentLoaded
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
