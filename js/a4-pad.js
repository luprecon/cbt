/**
 * CBT Memo Pad implementation
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

if (typeof module !== 'undefined' && module.exports) {
  module.exports = { createMemoPad };
}
