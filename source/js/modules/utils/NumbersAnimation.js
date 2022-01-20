export default class NumbersAnimation {
  constructor(selector, elemIndex, step, end) {
    this.selector = selector;
    this.elements = document.querySelectorAll(this.selector);
    this.index = elemIndex;
    this.currentNum = 0;
    this.step = step;
    this.end = end;
    this.fps = 12;
    this.fpsInterval = 1000 / this.fps;
    this.then = Date.now();
  }

  startTimer() {
    this.tick();
  }

  stopTimer() {
    cancelAnimationFrame(this.tickerRequest);
  }

  tick() {
    this.tickerRequest = requestAnimationFrame(() => {
      const now = Date.now();
      this.elapsed = now - this.then;

      if (this.elapsed > this.fpsInterval) {
        this.then = now - (this.elapsed % this.fpsInterval);

        if (this.end - this.currentNum < this.step) {
          this.currentNum = this.end;
        } else {
          this.currentNum += this.step;
        }

        this.setNum(this.currentNum);
      }

      if (this.currentNum >= this.end) {
        this.stopTimer();
      } else {
        this.tick();
      }
    });
  }

  setNum(number) {
    this.elements[this.index].innerText = `${number}`;
  }
}
