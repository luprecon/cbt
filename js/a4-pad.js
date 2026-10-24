/**
 * A4 Scratch Paper Simulator (A4 연습지 1장 시뮬레이터)
 * - 실제 시험장 1장 제공 원칙 반영
 * - 고해상도(1200x1697 A4 표준 비율) 캔버스 엔진 (창 크기 조절에도 드로잉 히스토리 완전 보존)
 * - 단일 탭 점 찍기(Dot tap), 경계 밖 드로잉 추적(Window tracking) 지원
 * - 변수 추적표(Trace Table) 동적 열/행 추가/삭제 및 문제 추적표 1클릭 복사
 * - A4 격자/4분할 접기선/줄노트 배경 옵션
 */

class A4ScratchPad {
  constructor({
    paperEl,
    canvasEl,
    traceLayerEl,
    traceTableEl,
    traceNotesEl,
    undoBtn,
    redoBtn,
    clearBtn,
    eraserBtn,
    colorDots,
    sizeSelect,
    patternSelect,
    tabCanvasBtn,
    tabTraceBtn,
    addColBtn,
    delColBtn,
    addRowBtn,
    delRowBtn,
    clearTraceBtn,
    templateSelect
  }) {
    this.paperEl = paperEl;
    this.canvasEl = canvasEl;
    this.ctx = canvasEl.getContext('2d');
    this.traceLayerEl = traceLayerEl;
    this.traceTableEl = traceTableEl;
    this.traceNotesEl = traceNotesEl;

    // Fixed A4 Buffer Dimensions (1200 x 1697, 1:1.4142)
    this.VIRTUAL_WIDTH = 1200;
    this.VIRTUAL_HEIGHT = 1697;

    // Drawing State
    this.isDrawing = false;
    this.currentColor = '#111827';
    this.currentSize = 3;
    this.isEraser = false;

    // Undo / Redo history
    this.historyStack = [];
    this.redoStack = [];
    this.maxHistory = 25;

    // UI Buttons
    this.undoBtn = undoBtn;
    this.redoBtn = redoBtn;
    this.clearBtn = clearBtn;
    this.eraserBtn = eraserBtn;
    this.colorDots = colorDots;
    this.sizeSelect = sizeSelect;
    this.patternSelect = patternSelect;
    this.tabCanvasBtn = tabCanvasBtn;
    this.tabTraceBtn = tabTraceBtn;
    this.addColBtn = addColBtn;
    this.delColBtn = delColBtn;
    this.addRowBtn = addRowBtn;
    this.delRowBtn = delRowBtn;
    this.clearTraceBtn = clearTraceBtn;
    this.templateSelect = templateSelect;

    this.activeMode = 'canvas'; // 'canvas' | 'trace'

    this.initCanvasSize();
    this.bindEvents();
    this.saveState(); // Initial blank state
    this.initDefaultTraceTable();
  }

  initCanvasSize() {
    // 캔버스 버퍼를 고정 1200 x 1697로 설정하여 리사이즈 시에도 캔버스가 지워지지 않음
    this.canvasEl.width = this.VIRTUAL_WIDTH;
    this.canvasEl.height = this.VIRTUAL_HEIGHT;

    this.ctx.lineCap = 'round';
    this.ctx.lineJoin = 'round';
    this.applyBrushSettings();
  }

  applyBrushSettings() {
    if (this.isEraser) {
      this.ctx.globalCompositeOperation = 'destination-out';
      this.ctx.lineWidth = this.currentSize * 5;
    } else {
      this.ctx.globalCompositeOperation = 'source-over';
      this.ctx.strokeStyle = this.currentColor;
      this.ctx.lineWidth = this.currentSize;
    }
  }

  getCoords(clientX, clientY) {
    const rect = this.canvasEl.getBoundingClientRect();
    const scaleX = this.VIRTUAL_WIDTH / (rect.width || 1);
    const scaleY = this.VIRTUAL_HEIGHT / (rect.height || 1);
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  saveState() {
    if (this.historyStack.length >= this.maxHistory) {
      this.historyStack.shift();
    }
    const imgData = this.ctx.getImageData(0, 0, this.VIRTUAL_WIDTH, this.VIRTUAL_HEIGHT);
    this.historyStack.push(imgData);
    this.redoStack = []; // 새로운 동작 시 리두 초기화
  }

  undo() {
    if (this.historyStack.length > 1) {
      const current = this.historyStack.pop();
      this.redoStack.push(current);
      const prev = this.historyStack[this.historyStack.length - 1];
      this.ctx.putImageData(prev, 0, 0);
    }
  }

  redo() {
    if (this.redoStack.length > 0) {
      const next = this.redoStack.pop();
      this.historyStack.push(next);
      this.ctx.putImageData(next, 0, 0);
    }
  }

  clearCanvas() {
    if (!confirm('A4 연습지 캔버스를 전체 지우시겠습니까?')) return;
    this.ctx.save();
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.clearRect(0, 0, this.VIRTUAL_WIDTH, this.VIRTUAL_HEIGHT);
    this.ctx.restore();
    this.saveState();
  }

  setPenColor(color) {
    this.currentColor = color;
    this.isEraser = false;
    if (this.eraserBtn) this.eraserBtn.classList.remove('active');
    this.applyBrushSettings();
  }

  setPenSize(size) {
    // 1200px 기준 비율 스케일링
    this.currentSize = parseFloat(size) * 1.5;
    this.applyBrushSettings();
  }

  toggleEraser() {
    this.isEraser = !this.isEraser;
    if (this.eraserBtn) {
      this.eraserBtn.classList.toggle('active', this.isEraser);
    }
    this.applyBrushSettings();
  }

  setPattern(pattern) {
    this.paperEl.classList.remove('pattern-grid', 'pattern-quadrants', 'pattern-ruled');
    if (pattern === 'grid') {
      this.paperEl.classList.add('pattern-grid');
    } else if (pattern === 'quadrants') {
      this.paperEl.classList.add('pattern-quadrants');
    } else if (pattern === 'ruled') {
      this.paperEl.classList.add('pattern-ruled');
    }
  }

  switchMode(mode) {
    this.activeMode = mode;
    if (mode === 'canvas') {
      if (this.traceLayerEl) this.traceLayerEl.classList.remove('show');
      if (this.tabCanvasBtn) this.tabCanvasBtn.classList.add('active');
      if (this.tabTraceBtn) this.tabTraceBtn.classList.remove('active');
    } else {
      if (this.traceLayerEl) this.traceLayerEl.classList.add('show');
      if (this.tabCanvasBtn) this.tabCanvasBtn.classList.remove('active');
      if (this.tabTraceBtn) this.tabTraceBtn.classList.add('active');
    }
  }

  // Trace Table Methods
  initDefaultTraceTable() {
    this.loadTemplate('simple_loop');
  }

  loadTemplate(type) {
    if (!this.traceTableEl) return;
    let headers = [];
    let rows = 4;

    switch (type) {
      case 'double_loop':
        headers = ['반복(i)', '반복(j)', 'arr[i][j]', 'sum / 조건', '출력값'];
        break;
      case 'pointer_array':
        headers = ['단계', '포인터 p', '*p', 'arr[i]', '결과값'];
        break;
      case 'recursion':
        headers = ['깊이(depth)', '호출 fn(n)', '종료 조건', '반환값'];
        break;
      case 'simple_loop':
      default:
        headers = ['반복(i)', '조건식', '연산 변수(sum)', '출력값'];
        break;
    }

    this.renderTraceTable(headers, rows);
  }

  loadCustomHeaders(headers, rows = 5) {
    if (!Array.isArray(headers) || headers.length === 0) return;
    this.renderTraceTable(headers, rows);
    this.switchMode('trace');
  }

  renderTraceTable(headers, numRows) {
    let html = '<thead><tr>';
    headers.forEach(h => {
      html += `<th><input type="text" value="${this.escapeHtml(h)}"></th>`;
    });
    html += '</tr></thead><tbody>';

    for (let r = 0; r < numRows; r++) {
      html += '<tr>';
      headers.forEach(() => {
        html += `<td><input type="text" placeholder="-"></td>`;
      });
      html += '</tr>';
    }
    html += '</tbody>';

    this.traceTableEl.innerHTML = html;
  }

  addColumn() {
    if (!this.traceTableEl) return;
    const theadRow = this.traceTableEl.querySelector('thead tr');
    const tbodyRows = this.traceTableEl.querySelectorAll('tbody tr');
    if (!theadRow) return;

    const th = document.createElement('th');
    th.innerHTML = '<input type="text" value="변수">';
    theadRow.appendChild(th);

    tbodyRows.forEach(tr => {
      const td = document.createElement('td');
      td.innerHTML = '<input type="text" placeholder="-">';
      tr.appendChild(td);
    });
  }

  deleteColumn() {
    if (!this.traceTableEl) return;
    const theadRow = this.traceTableEl.querySelector('thead tr');
    const tbodyRows = this.traceTableEl.querySelectorAll('tbody tr');
    if (!theadRow || theadRow.children.length <= 1) return;

    theadRow.removeChild(theadRow.lastElementChild);
    tbodyRows.forEach(tr => {
      if (tr.lastElementChild) tr.removeChild(tr.lastElementChild);
    });
  }

  addRow() {
    if (!this.traceTableEl) return;
    const colCount = this.traceTableEl.querySelectorAll('thead th').length || 4;
    const tbody = this.traceTableEl.querySelector('tbody');
    if (!tbody) return;

    const tr = document.createElement('tr');
    for (let i = 0; i < colCount; i++) {
      const td = document.createElement('td');
      td.innerHTML = '<input type="text" placeholder="-">';
      tr.appendChild(td);
    }
    tbody.appendChild(tr);
  }

  deleteRow() {
    if (!this.traceTableEl) return;
    const tbody = this.traceTableEl.querySelector('tbody');
    if (tbody && tbody.lastElementChild) {
      tbody.removeChild(tbody.lastElementChild);
    }
  }

  clearTrace() {
    if (!confirm('변수 추적표 및 메모 내용을 초기화하시겠습니까?')) return;
    this.initDefaultTraceTable();
    if (this.traceNotesEl) this.traceNotesEl.value = '';
  }

  escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  bindEvents() {
    const startStroke = (clientX, clientY) => {
      this.isDrawing = true;
      const p = this.getCoords(clientX, clientY);
      this.ctx.beginPath();
      this.ctx.moveTo(p.x, p.y);
      // 단일 점 클릭 시 점이 남도록 lineTo + stroke 즉시 실행
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
    };

    const moveStroke = (clientX, clientY) => {
      if (!this.isDrawing) return;
      const p = this.getCoords(clientX, clientY);
      this.ctx.lineTo(p.x, p.y);
      this.ctx.stroke();
    };

    const stopStroke = () => {
      if (this.isDrawing) {
        this.isDrawing = false;
        this.ctx.closePath();
        this.saveState();
      }
    };

    // Mouse Events
    this.canvasEl.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return; // 좌클릭만 허용
      startStroke(e.clientX, e.clientY);
    });

    window.addEventListener('mousemove', (e) => {
      moveStroke(e.clientX, e.clientY);
    });

    window.addEventListener('mouseup', stopStroke);

    // Touch Events
    this.canvasEl.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        e.preventDefault();
        startStroke(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchmove', (e) => {
      if (this.isDrawing && e.touches.length > 0) {
        e.preventDefault();
        moveStroke(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: false });

    window.addEventListener('touchend', stopStroke);
    window.addEventListener('touchcancel', stopStroke);

    // Toolbar buttons
    if (this.undoBtn) this.undoBtn.addEventListener('click', () => this.undo());
    if (this.redoBtn) this.redoBtn.addEventListener('click', () => this.redo());
    if (this.clearBtn) this.clearBtn.addEventListener('click', () => this.clearCanvas());
    if (this.eraserBtn) this.eraserBtn.addEventListener('click', () => this.toggleEraser());

    if (this.colorDots) {
      this.colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
          this.colorDots.forEach(d => d.classList.remove('active'));
          dot.classList.add('active');
          this.setPenColor(dot.dataset.color);
        });
      });
    }

    if (this.sizeSelect) {
      this.sizeSelect.addEventListener('change', (e) => this.setPenSize(e.target.value));
    }

    if (this.patternSelect) {
      this.patternSelect.addEventListener('change', (e) => this.setPattern(e.target.value));
    }

    if (this.tabCanvasBtn) {
      this.tabCanvasBtn.addEventListener('click', () => this.switchMode('canvas'));
    }
    if (this.tabTraceBtn) {
      this.tabTraceBtn.addEventListener('click', () => this.switchMode('trace'));
    }

    // Trace Table Actions
    if (this.addColBtn) this.addColBtn.addEventListener('click', () => this.addColumn());
    if (this.delColBtn) this.delColBtn.addEventListener('click', () => this.deleteColumn());
    if (this.addRowBtn) this.addRowBtn.addEventListener('click', () => this.addRow());
    if (this.delRowBtn) this.delRowBtn.addEventListener('click', () => this.deleteRow());
    if (this.clearTraceBtn) this.clearTraceBtn.addEventListener('click', () => this.clearTrace());

    if (this.templateSelect) {
      this.templateSelect.addEventListener('change', (e) => this.loadTemplate(e.target.value));
    }
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = A4ScratchPad;
}

/**
 * companyTest Memo Pad implementation
 * Canvas 250x250 with HiDPI support and per-question history
 */
function createMemoPad(canvasEl, clearBtnEl) {
  if (!canvasEl) return null;
  const ctx = canvasEl.getContext('2d');
  const history = {};
  const bufferHistory = {};
  let isDrawing = false;
  let currentKey = 0;

  const dpr = window.devicePixelRatio || 1;
  canvasEl.width = 250 * dpr;
  canvasEl.height = 250 * dpr;
  ctx.scale(dpr, dpr);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.strokeStyle = '#1e293b';
  ctx.lineWidth = 1.8;

  function clearCanvas() {
    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvasEl.width, canvasEl.height);
    ctx.restore();
  }

  function getCoords(e) {
    const rect = canvasEl.getBoundingClientRect();
    const clientX = e.touches && e.touches.length > 0 ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches && e.touches.length > 0 ? e.touches[0].clientY : e.clientY;
    const scaleX = 250 / (rect.width || 250);
    const scaleY = 250 / (rect.height || 250);
    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  }

  function startDrawing(e) {
    isDrawing = true;
    const p = getCoords(e);
    ctx.beginPath();
    ctx.arc(p.x, p.y, ctx.lineWidth / 2, 0, Math.PI * 2);
    ctx.fillStyle = ctx.strokeStyle;
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  }

  function draw(e) {
    if (!isDrawing) return;
    const p = getCoords(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  }

  function stopDrawing() {
    if (isDrawing) {
      isDrawing = false;
      history[currentKey] = canvasEl.toDataURL();
      try {
        bufferHistory[currentKey] = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
      } catch (err) {}
    }
  }

  canvasEl.addEventListener('mousedown', startDrawing);
  canvasEl.addEventListener('mousemove', draw);
  window.addEventListener('mouseup', stopDrawing);
  canvasEl.addEventListener('mouseleave', () => {
    if (isDrawing) {
      isDrawing = false;
      history[currentKey] = canvasEl.toDataURL();
      try {
        bufferHistory[currentKey] = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
      } catch (err) {}
    }
  });

  // Touch support for tablet / touchscreen
  canvasEl.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startDrawing(e);
  }, { passive: false });
  canvasEl.addEventListener('touchmove', (e) => {
    e.preventDefault();
    draw(e);
  }, { passive: false });
  window.addEventListener('touchend', stopDrawing);
  window.addEventListener('touchcancel', stopDrawing);

  if (clearBtnEl) {
    clearBtnEl.addEventListener('click', () => {
      clearCanvas();
      delete history[currentKey];
      delete bufferHistory[currentKey];
    });
  }

  return {
    save(key = currentKey) {
      history[key] = canvasEl.toDataURL();
      try {
        bufferHistory[key] = ctx.getImageData(0, 0, canvasEl.width, canvasEl.height);
      } catch (err) {}
    },
    restore(key) {
      currentKey = key;
      clearCanvas();
      if (bufferHistory[key]) {
        ctx.putImageData(bufferHistory[key], 0, 0);
      } else if (history[key]) {
        const img = new Image();
        img.onload = () => {
          if (currentKey === key) {
            clearCanvas();
            ctx.drawImage(img, 0, 0, 250, 250);
          }
        };
        img.src = history[key];
      }
    },
    clearAll() {
      for (const k in history) delete history[k];
      for (const k in bufferHistory) delete bufferHistory[k];
      clearCanvas();
    },
    getHistory() {
      return history;
    }
  };
}

if (typeof window !== 'undefined') {
  window.createMemoPad = createMemoPad;
}

