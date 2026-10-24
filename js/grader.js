/**
 * 정보처리기사 실기 자동 채점 엔진 (Grader Engine)
 * - 주관식 단답형, 약술형 핵심어, 다중 빈칸(1, 2...), 코드 출력 결과 유연 채점
 * - 대소문자 무관/엄격 처리, 한글/영문 동의어(Aliases), 공백/세미콜론/따옴표/대괄호 정규화
 */

const Grader = {
  /**
   * 문자열 정규화 (공백 제거, 따옴표 정리, 세미콜론 정리)
   */
  normalizeText(str, preserveCase = false) {
    if (str === null || str === undefined) return '';
    let res = String(str).trim();

    // 양 끝 세미콜론 제거 (SQL 문장 끝 세미콜론 유연성)
    res = res.replace(/;+\s*$/, '');

    // 양 끝 큰따옴표 또는 작은따옴표 제거 ("Singleton" -> Singleton)
    if ((res.startsWith('"') && res.endsWith('"')) || (res.startsWith("'") && res.endsWith("'"))) {
      if (res.length >= 2) {
        res = res.slice(1, -1).trim();
      }
    }

    // 단일 단어 양 끝 괄호 제거 ((싱글톤) -> 싱글톤)
    if (res.startsWith('(') && res.endsWith(')') && !res.slice(1, -1).includes('(')) {
      res = res.slice(1, -1).trim();
    }

    if (!preserveCase) {
      res = res.toLowerCase();
    }

    // 다중 공백을 단일 공백으로 치환
    res = res.replace(/\s+/g, ' ');
    return res;
  },

  /**
   * 코드 출력물 정규화 (개행이나 쉼표, 공백, 대괄호 차이 유연 처리)
   */
  normalizeCodeOutput(str) {
    if (str === null || str === undefined) return '';
    let res = String(str)
      .replace(/;+\s*$/, '')
      .replace(/\r\n/g, '\n')
      .replace(/[\n,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();

    // 양 끝 따옴표 제거
    if ((res.startsWith('"') && res.endsWith('"')) || (res.startsWith("'") && res.endsWith("'"))) {
      if (res.length >= 2) res = res.slice(1, -1).trim();
    }

    return res;
  },

  /**
   * 리스트/배열 대괄호 제거 및 정규화
   * e.g. "[18, 12, 6]" -> "18 12 6"
   */
  stripBrackets(str) {
    if (!str) return '';
    return String(str)
      .replace(/[\[\]\(\)\{\}]/g, ' ')
      .replace(/[\n,]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  },

  /**
   * 집합/항목 나열 순서 무관 동치 검사
   * (e.g. {'중국', '한국'} == {'한국', '중국'}, 'A, B, C' == 'C, B, A')
   */
  isSetEquivalent(s1, s2, caseSensitive = false) {
    if (!s1 || !s2) return false;
    let str1 = String(s1).trim();
    let str2 = String(s2).trim();

    const isSetLiteral = (s) => (s.startsWith('{') && s.endsWith('}')) || (s.startsWith('[') && s.endsWith(']'));
    const hasComma = str1.includes(',') || str2.includes(',');

    // 쉼표가 없고 세트 리터럴도 아닌 경우(단순 공백 구분 순서 보장 코드 출력)는 순서 변경 허용 안 함
    if (!hasComma && !isSetLiteral(str1) && !isSetLiteral(str2)) {
      return false;
    }

    // 괄호, 중괄호, 대괄호 제거
    str1 = str1.replace(/^[\[\{\(]+|[\]\}\)]+$/g, '').trim();
    str2 = str2.replace(/^[\[\{\(]+|[\]\}\)]+$/g, '').trim();

    const splitTokens = (s) => {
      const parts = s.includes(',') ? s.split(',') : s.split(/\s+/);
      return parts
        .map(t => {
          let token = t.trim().replace(/^['"]+|['"]+$/g, '');
          return caseSensitive ? token : token.toLowerCase();
        })
        .filter(t => t.length > 0)
        .sort();
    };

    const t1 = splitTokens(str1);
    const t2 = splitTokens(str2);

    if (t1.length <= 1 || t1.length !== t2.length) return false;

    for (let i = 0; i < t1.length; i++) {
      if (t1[i] !== t2[i]) return false;
    }
    return true;
  },

  /**
   * 숫자 비교 (10 == 10.0)
   */
  isNumericEqual(s1, s2) {
    if (!s1 || !s2) return false;
    const n1 = Number(s1);
    const n2 = Number(s2);
    if (!isNaN(n1) && !isNaN(n2) && isFinite(n1) && isFinite(n2)) {
      return n1 === n2;
    }
    return false;
  },

  /**
   * 단일 주관식 정답 채점
   * @param {string} userAnswer - 사용자가 입력한 값
   * @param {object} question - 문제 객체
   * @returns {boolean} 정답 여부
   */
  gradeSingle(userAnswer, question) {
    if (!userAnswer || !userAnswer.trim()) return false;

    const userRaw = userAnswer.trim();
    const isCodeCategory = ['C', 'Java', 'Python', 'SQL'].includes(question.category);
    const caseSensitive = question.caseSensitive === true;
    const mainAns = question.answer ? String(question.answer).trim() : '';

    // 후보 정답 리스트 (기본 answer + aliases)
    const targets = [mainAns];
    if (Array.isArray(question.aliases)) {
      question.aliases.forEach(a => {
        if (a && !targets.includes(a)) targets.push(a);
      });
    }

    // 1. 숫자 완전 일치 검사
    for (const target of targets) {
      if (this.isNumericEqual(userRaw, target)) {
        return true;
      }
    }

    // 2. 코드 출력물 유연 비교 (개행, 공백, 쉼표)
    if (isCodeCategory && question.isCodeOutput !== false) {
      const normUser = this.normalizeCodeOutput(userRaw);
      for (const target of targets) {
        const normTarget = this.normalizeCodeOutput(target);
        if (normUser === normTarget) return true;
        if (!caseSensitive && normUser.toLowerCase() === normTarget.toLowerCase()) return true;

        // 대괄호 제거 후 비교 (파이썬 리스트 [18, 12, 6] vs 18 12 6)
        const strippedUser = this.stripBrackets(userRaw);
        const strippedTarget = this.stripBrackets(target);
        if (strippedUser === strippedTarget) return true;
        if (!caseSensitive && strippedUser.toLowerCase() === strippedTarget.toLowerCase()) return true;
      }
    }

    // 3. 텍스트 정규화 비교
    const userNorm = this.normalizeText(userRaw, caseSensitive);
    const userNoSpace = userNorm.replace(/\s+/g, '');

    for (const target of targets) {
      const targetNorm = this.normalizeText(target, caseSensitive);
      if (userNorm === targetNorm) return true;

      // 띄어쓰기 완전 제거 비교 (한글/영문: "살충제 패러독스" == "살충제패러독스")
      const targetNoSpace = targetNorm.replace(/\s+/g, '');
      if (userNoSpace === targetNoSpace) return true;

      // 대괄호 제거 비교
      const strippedUser = this.stripBrackets(userNorm);
      const strippedTarget = this.stripBrackets(targetNorm);
      if (strippedUser === strippedTarget && strippedUser.length > 0) return true;

      // 집합/항목 나열 순서 무관 비교
      if (this.isSetEquivalent(userRaw, target, caseSensitive)) return true;
    }

    return false;
  },

  /**
   * 다중 빈칸 채점 (1번, 2번 빈칸 등)
   * @param {object} userAnswers - { "1": "값", "2": "값" }
   * @param {object} question - 문제 객체
   */
  gradeMultiBlank(userAnswers, question) {
    if (!userAnswers || typeof userAnswers !== 'object') {
      return { isCorrect: false, scoreRatio: 0, correctCount: 0, totalCount: 0, details: {} };
    }
    if (!question.multiAnswers || typeof question.multiAnswers !== 'object') {
      return { isCorrect: false, scoreRatio: 0, correctCount: 0, totalCount: 0, details: {} };
    }

    const blanks = Object.keys(question.multiAnswers);
    let correctCount = 0;
    const details = {};

    blanks.forEach(blankKey => {
      const userVal = (userAnswers[blankKey] || '').trim();
      const validAnswers = question.multiAnswers[blankKey]; // array or string
      let matched = false;

      const candidates = Array.isArray(validAnswers) ? validAnswers : [validAnswers];
      for (const cand of candidates) {
        // 숫자 일치
        if (this.isNumericEqual(userVal, cand)) {
          matched = true;
          break;
        }

        const userNorm = this.normalizeText(userVal);
        const candNorm = this.normalizeText(cand);
        if (userNorm === candNorm || userNorm.replace(/\s+/g, '') === candNorm.replace(/\s+/g, '')) {
          matched = true;
          break;
        }

        // 코드 출력형 공백 정규화
        if (this.normalizeCodeOutput(userVal).toLowerCase() === this.normalizeCodeOutput(cand).toLowerCase()) {
          matched = true;
          break;
        }

        // 대괄호 제거 비교
        const strippedUser = this.stripBrackets(userNorm);
        const strippedTarget = this.stripBrackets(candNorm);
        if (strippedUser === strippedTarget && strippedUser.length > 0) {
          matched = true;
          break;
        }

        // 집합/항목 나열 순서 무관 비교
        if (this.isSetEquivalent(userVal, cand, false)) {
          matched = true;
          break;
        }
      }

      details[blankKey] = matched;
      if (matched) correctCount++;
    });

    const isAllCorrect = blanks.length > 0 && correctCount === blanks.length;
    const scoreRatio = blanks.length > 0 ? (correctCount / blanks.length) : 0;

    return {
      isCorrect: isAllCorrect,
      scoreRatio,
      correctCount,
      totalCount: blanks.length,
      details
    };
  },

  /**
   * 문항 채점 통합 함수
   * @param {*} userAnswer - 문자열 또는 객체
   * @param {object} question - 문제 객체
   * @returns {object} { isCorrect: boolean, scoreRatio: number, feedback: string }
   */
  gradeQuestion(userAnswer, question) {
    if (question.answerType === 'multi_blank') {
      const res = this.gradeMultiBlank(userAnswer, question);
      const displayUserAns = typeof userAnswer === 'object' && userAnswer !== null
        ? Object.entries(userAnswer).map(([k, v]) => `(${k}) ${v || '(미입력)'}`).join(', ')
        : (userAnswer || '(미입력)');

      const displayCorrectAns = question.answer || Object.entries(question.multiAnswers).map(([k, v]) => `(${k}) ${Array.isArray(v) ? v[0] : v}`).join(', ');

      return {
        isCorrect: res.isCorrect,
        scoreRatio: res.scoreRatio,
        correctCount: res.correctCount,
        totalCount: res.totalCount,
        details: res.details,
        userAnswer: displayUserAns,
        correctAnswer: displayCorrectAns
      };
    } else {
      const isCorrect = this.gradeSingle(userAnswer, question);
      return {
        isCorrect,
        scoreRatio: isCorrect ? 1 : 0,
        correctCount: isCorrect ? 1 : 0,
        totalCount: 1,
        userAnswer: (userAnswer && String(userAnswer).trim()) ? String(userAnswer).trim() : '(미입력)',
        correctAnswer: question.answer
      };
    }
  }
};

if (typeof window !== 'undefined') {
  window.Grader = Grader;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Grader;
}
