/**
 * Change svg url.
 * @param {string} selector
 */
export default function (selector) {
  const prizesItems = document.querySelectorAll(selector);

  prizesItems.forEach((item) => {
    const {src} = item;

    if (src.match(`timestamp`)) {
      const newSrc = src.replace(/\?timestamp=[0-9]+/g, `?timestamp=${Date.now()}`);
      item.src = newSrc;
    } else {
      item.src = `${src}?timestamp=${Date.now()}`;
    }
  });
}
