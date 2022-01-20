import reloadSvgAnimation from './utils/reload-svg-animation';

document.body.addEventListener(`screenChanged`, (evt) => {
  const {screenName} = evt.detail;

  if (screenName === `prizes`) {
    reloadSvgAnimation(`.prizes__item img`);
  }
});
