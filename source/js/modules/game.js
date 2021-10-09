const animateDuration = (render, duration) => {
  let id = 0;

  const promise = new Promise((resolve) => {
    const start = Date.now();

    (function tick() {
      const elapsed = Date.now() - start;

      if (elapsed > duration) {
        render(duration);
        resolve();
      } else {
        id = requestAnimationFrame(tick);
        render(elapsed);
      }
    })();
  });

  promise.cancel = () => cancelAnimationFrame(id);

  return promise;
};

const gameTimer = () => {
  const container = document.getElementById(`game-counter`);
  const [minutes, seconds] = container.querySelectorAll(`span`);
  let timer = null;

  document.body.addEventListener(`screenChanged`, ({detail}) => {
    if (detail.screenName === `game`) {
      const remaining = 5 * 60 * 1000;

      timer = animateDuration((elapsed) => {
        const time = new Date(Math.floor(remaining - elapsed));

        minutes.textContent = time.getMinutes().toString().padStart(2, `0`);
        seconds.textContent = time.getSeconds().toString().padStart(2, `0`);
      }, remaining);
    } else if (timer) {
      timer.cancel();
    }
  });
};

export default () => {
  gameTimer();
};
