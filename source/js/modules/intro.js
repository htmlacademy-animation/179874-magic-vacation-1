import animateLetters from '../utils/animate-letters';

export default () => {
  const animationNodes = document.querySelectorAll(`.js-animate-letters`);
  const introDateNode = document.querySelector(`.intro__info .js-animate-letters`);
  animationNodes.forEach((node) => animateLetters(node, 0.5));
  animateLetters(introDateNode, 1.5);
};
