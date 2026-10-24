/**
 * 정보처리기사 실기 150분 카운트다운 타이머
 * - 2시간 30분(9000초) 실전 모드 타이머
 * - 일시정지, 재개, 경고(10분 미만 시 점멸)
 */

class ExamTimer {
  constructor({ displayEl, totalSeconds = 150 * 60, onTimeUp = null, onTick = null }) {
    this.displayEl = displayEl;
    this.initialSeconds = totalSeconds;
    this.timeLeft = totalSeconds;
    this.timerId = null;
    this.isRunning = false;
    this.onTimeUp = onTimeUp;
    this.onTick = onTick;

    this.render();
  }

  formatTime(totalSec) {
    const hours = Math.floor(totalSec / 3600);
    const mins = Math.floor((totalSec % 3600) / 60);
    const secs = totalSec % 60;

    const hh = String(hours).padStart(2, '0');
    const mm = String(mins).padStart(2, '0');
    const ss = String(secs).padStart(2, '0');

    if (hours > 0) {
      return `${hh}:${mm}:${ss}`;
    }
    return `${mm}:${ss}`;
  }

  render() {
    if (!this.displayEl) return;
    this.displayEl.textContent = this.formatTime(this.timeLeft);

    // 10분(600초) 미만일 경우 경고 스타일 적용
    if (this.timeLeft <= 600 && this.timeLeft > 0) {
      this.displayEl.classList.add('warning');
    } else {
      this.displayEl.classList.remove('warning');
    }
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;

    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.render();
        if (this.onTick) this.onTick(this.timeLeft);

        if (this.timeLeft === 0) {
          this.pause();
          if (this.onTimeUp) this.onTimeUp();
        }
      }
    }, 1000);
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
  }

  toggle() {
    if (this.isRunning) {
      this.pause();
    } else {
      this.start();
    }
    return this.isRunning;
  }

  reset(newSeconds = this.initialSeconds) {
    this.pause();
    this.initialSeconds = newSeconds;
    this.timeLeft = newSeconds;
    this.render();
  }

  getElapsedSeconds() {
    return this.initialSeconds - this.timeLeft;
  }
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = ExamTimer;
}
