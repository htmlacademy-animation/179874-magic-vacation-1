/**
 * Animate node text.
 * @param {Element} node
 * @param {number} delay
 * @param {number} interval
 */
export default (node, delay = 0, interval = 0.05) => {
  const nodeText = node.textContent;
  const nodeWords = nodeText.split(` `);

  const animatedText = nodeWords.reduce((textWrapper, word, wordIdx) => {
    const wordWrapper = document.createElement(`span`);
    const letters = word.split(``);

    const lettersOrder = Object.keys(letters)
      .map(Number)
      .sort(() => Math.random() - 0.5);

    const wordInterval = delay
      + (letters.length / 2)
      * (letters.length - 1)
      * interval
      * (wordIdx / nodeWords.length);

    letters.reduce((wrapper, letter, letterIdx) => {
      const letterWrapper = document.createElement(`span`);

      letterWrapper.classList.add(`letter`);
      letterWrapper.textContent = letter;
      letterWrapper.style.animationDelay = wordInterval + lettersOrder[letterIdx] * interval + `s`;

      wrapper.appendChild(letterWrapper);

      return wrapper;
    }, wordWrapper);

    wordWrapper.classList.add(`word`);
    textWrapper.appendChild(wordWrapper);

    return textWrapper;
  }, document.createDocumentFragment());

  node.innerHTML = ``;
  node.appendChild(animatedText);
};
