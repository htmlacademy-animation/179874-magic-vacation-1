// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import game from './modules/game.js';
import prizes from './modules/prizes.js';
import FullPageScroll from './modules/full-page-scroll';

// utils
import animateLetters from './utils/animate-letters';

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
game();
prizes();

// page scroll
const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

// add loaded
window.addEventListener(`load`, () => {
  document.body.classList.add(`loaded`);
});

// clean loaded
document.body.addEventListener(`screenChanged`, (evt) => {
  const {classList} = document.body;

  classList.forEach((klass) => {
    if (klass !== `loaded`) {
      document.body.classList.remove(klass);
    }
  });
});

// animate titles letters
const animationNodes = document.querySelectorAll(`.js-animate-letters`);
const introDateNode = document.querySelector(`.intro__info .js-animate-letters`);
animationNodes.forEach((node) => animateLetters(node, 0.5));
animateLetters(introDateNode, 1.5);
