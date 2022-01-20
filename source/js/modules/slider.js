import Swiper from "swiper";
import SliderScene from '../3d-scenes/slider-scene';

export default () => {
  const sliderScene = new SliderScene();

  let storySlider;
  let sliderContainer = document.getElementById(`story`);

  const emitSliderChangeEvent = function (sliderId) {
    let sliderColor;

    if (sliderId === 0) {
      sliderColor = ``;
    } else if (sliderId === 2) {
      sliderColor = `dark-blue`;
    } else if (sliderId === 4) {
      sliderColor = `light-blue`;
    } else if (sliderId === 6) {
      sliderColor = ``;
    }

    const event = new CustomEvent(`slideChanged`, {
      detail: {sliderColor},
    });

    sliderContainer.dispatchEvent(event);
  };

  const onSliderChange = function (evt) {
    const {sliderColor} = evt.detail;
    const {classList} = document.body;

    classList.forEach((klass) => {
      if (klass !== `loaded`) {
        document.body.classList.remove(klass);
      }
    });

    if (sliderColor) {
      document.body.classList.add(sliderColor);
    }
  };

  const resetSlider = function () {
    if (storySlider) {
      storySlider.destroy();
    }
    setSlider();
  };

  const setSlider = function () {
    if (((window.innerWidth / window.innerHeight) < 1) || window.innerWidth < 769) {
      storySlider = new Swiper(`.js-slider`, {
        pagination: {
          el: `.swiper-pagination`,
          type: `bullets`
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0 || storySlider.activeIndex === 1) {
              sliderContainer.style.backgroundImage = `url("img/slide1.jpg"), linear-gradient(180deg, rgba(83, 65, 118, 0) 0%, #523E75 16.85%)`;
            } else if (storySlider.activeIndex === 2 || storySlider.activeIndex === 3) {
              sliderContainer.style.backgroundImage = `url("img/slide2.jpg"), linear-gradient(180deg, rgba(45, 54, 179, 0) 0%, #2A34B0 16.85%)`;
            } else if (storySlider.activeIndex === 4 || storySlider.activeIndex === 5) {
              sliderContainer.style.backgroundImage = `url("img/slide3.jpg"), linear-gradient(180deg, rgba(92, 138, 198, 0) 0%, #5183C4 16.85%)`;
            } else if (storySlider.activeIndex === 6 || storySlider.activeIndex === 7) {
              sliderContainer.style.backgroundImage = `url("img/slide4.jpg"), linear-gradient(180deg, rgba(45, 39, 63, 0) 0%, #2F2A42 16.85%)`;
            }
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    } else {
      storySlider = new Swiper(`.js-slider`, {
        slidesPerView: 2,
        slidesPerGroup: 2,
        pagination: {
          el: `.swiper-pagination`,
          type: `fraction`
        },
        navigation: {
          nextEl: `.js-control-next`,
          prevEl: `.js-control-prev`,
        },
        keyboard: {
          enabled: true
        },
        on: {
          slideChange: () => {
            if (storySlider.activeIndex === 0) {
              sliderScene.setBackground(0);
            } else if (storySlider.activeIndex === 2) {
              sliderScene.setBackground(1);
            } else if (storySlider.activeIndex === 4) {
              sliderScene.setBackground(2);
            } else if (storySlider.activeIndex === 6) {
              sliderScene.setBackground(3);
            }

            emitSliderChangeEvent(storySlider.activeIndex);
          },
          resize: () => {
            storySlider.update();
          }
        },
        observer: true,
        observeParents: true
      });
    }
  };

  document.body.addEventListener(`screenChanged`, (evt) => {
    const {screenName} = evt.detail;
    const isFirstSlide = storySlider.activeIndex === 0;

    if (!isFirstSlide) {
      resetSlider();
    }

    if (screenName === `story`) {
      sliderScene.start();
    } else {
      sliderScene.stop();
    }
  });

  sliderContainer.addEventListener(`slideChanged`, onSliderChange);
  window.addEventListener(`resize`, resetSlider);

  setSlider();
};
