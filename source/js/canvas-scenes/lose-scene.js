import Animation from '../utils/animation';
import Scene2D from '../utils/scene-2d.js';
import easings from '../utils/easings.js';

const IMAGES_URLS = Object.freeze({
  key: `./img/module-4/lose-images/key.png`,
  crocodile: `./img/module-4/lose-images/crocodile.png`,
  flamingo: `./img/module-4/lose-images/flamingo.png`,
  watermelon: `./img/module-4/lose-images/watermelon.png`,
  leaf: `./img/module-4/lose-images/leaf.png`,
  snowflake: `./img/module-4/lose-images/snowflake.png`,
  saturn: `./img/module-4/lose-images/saturn.png`,
  drop: `./img/module-4/lose-images/drop.png`,
});

const OBJECTS = Object.freeze({
  key: {
    imageId: `key`,
    x: 50,
    y: 50,
    size: 22,
    opacity: 0,
    transforms: {
      translateY: 0,
    }
  },
  crocodile: {
    imageId: `crocodile`,
    x: 51,
    y: 59,
    size: 80,
    transforms: {
      translateX: 200,
      translateY: 0,
    }
  },
  flamingo: {
    imageId: `flamingo`,
    x: 55,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 55,
    y: 50,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 55,
    y: 55,
    size: 15,
    opacity: 0,
    transforms: {
      scaleX: 0,
      scaleY: 0,
    }
  },
  drop: {
    imageId: `drop`,
    x: 48.5,
    y: 61,
    size: 3,
    opacity: 0,
    transforms: {
      scaleX: 1,
      scaleY: 0,
    }
  },
});

const LOCALS = Object.freeze({
  keyMask: {
    centerX: 50,
    centerY: 50,
  }
});

export default class CrocodileScene extends Scene2D {
  constructor() {
    const canvas = document.getElementById(`lose-scene-canvas`);

    super({
      canvas,
      objects: OBJECTS,
      imagesUrls: IMAGES_URLS,
    });

    this.afterInit = () => {
      this.objects.crocodile.after = this.drawKeyMask.bind(this);
    };

    this.initEventListeners();
    this.initObjects(OBJECTS);
    this.initLocals();
    this.start();
  }

  initLocals() {
    this.locals = {
      keyMask: {
        centerX: LOCALS.keyMask.centerX,
        centerY: LOCALS.keyMask.centerY
      }
    };
  }

  initAnimations() {
    this.animations.push(new Animation({
      func: () => {
        this.drawScene();
      },
      duration: `infinite`,
      fps: 60
    }));

    this.initKeyAnimations();
    this.initFlamingoAnimations();
    this.initWatermelonAnimations();
    this.initLeafAnimations();
    this.initSnowflakeAnimations();
    this.initSaturnAnimations();
    this.initCrocodileAnimations();
    this.initDropAnimations();
  }

  drawKeyMask() {
    const mask = this.locals.keyMask;
    const width = this.objects.key.size;
    const size = this.size / 100;

    this.ctx.save();
    this.ctx.fillStyle = `#5f458c`;

    this.ctx.beginPath();

    this.ctx.moveTo((mask.centerX + width * 3) * size, (mask.centerY + width * 0.85) * size);
    this.ctx.lineTo((mask.centerX + width * 0.5) * size, (mask.centerY + width * 0.85) * size);
    this.ctx.lineTo((mask.centerX + width * 0.33) * size, (mask.centerY + width * 0.005) * size);
    this.ctx.bezierCurveTo((mask.centerX + width * 0.8) * size, (mask.centerY - width * 0.5) * size, (mask.centerX + width * 0.1) * size, (mask.centerY - width) * size, (mask.centerX + width * 0.2) * size, (mask.centerY - width) * size);
    this.ctx.lineTo((mask.centerX + width * 3) * size, (mask.centerY - width) * size);

    this.ctx.fill();
    this.ctx.restore();
  }

  initKeyAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.key.opacity = progress;
        this.objects.key.size = OBJECTS[`key`].size * 0.5 * progress + OBJECTS[`key`].size * 0.5;
      },
      duration: 300,
      easing: easings.easeInCubic
    }));
  }

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.opacity = progress;
        this.objects.flamingo.transforms.scaleX = progress;
        this.objects.flamingo.transforms.scaleY = progress;
        this.objects.flamingo.transforms.translateX = -30 * progress;
        this.objects.flamingo.transforms.translateY = -10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: easings.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.flamingo.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: easings.easeOutExpo
    }));
  }

  initWatermelonAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.opacity = progress;
        this.objects.watermelon.transforms.scaleX = progress;
        this.objects.watermelon.transforms.scaleY = progress;
        this.objects.watermelon.transforms.translateX = -30 * progress;
        this.objects.watermelon.transforms.translateY = 10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: easings.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.watermelon.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: easings.easeOutExpo
    }));
  }

  initLeafAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.opacity = progress;
        this.objects.leaf.transforms.scaleX = progress;
        this.objects.leaf.transforms.scaleY = progress;
        this.objects.leaf.transforms.translateX = 30 * progress;
        this.objects.leaf.transforms.translateY = -10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: easings.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.leaf.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: easings.easeOutExpo
    }));
  }

  initSnowflakeAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.opacity = progress;
        this.objects.snowflake.transforms.scaleX = progress;
        this.objects.snowflake.transforms.scaleY = progress;
        this.objects.snowflake.transforms.translateX = 15 * progress;
        this.objects.snowflake.transforms.translateY = -5 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: easings.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.snowflake.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: easings.easeOutExpo
    }));
  }

  initSaturnAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.opacity = progress;
        this.objects.saturn.transforms.scaleX = progress;
        this.objects.saturn.transforms.scaleY = progress;
        this.objects.saturn.transforms.translateX = 30 * progress;
        this.objects.saturn.transforms.translateY = 10 * progress;
      },
      delay: 1000,
      duration: 1000,
      easing: easings.easeInCubic
    }));

    this.animations.push(new Animation({
      func: (progress) => {
        this.objects.saturn.transforms.translateY = 100 * progress;
      },
      delay: 2250,
      duration: 1500,
      easing: easings.easeOutExpo
    }));
  }

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.crocodile.transforms.translateX = 50 * progressReversed;
        this.objects.crocodile.transforms.translateY = -10 * progressReversed;
      },
      delay: 1750,
      duration: 1500,
      easing: easings.easeInCubic
    }));
  }

  initDropAnimations() {
    const delayStart = 3500;
    const interval = 2500;

    this.dropAnimations = [];

    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        this.objects.drop.opacity = 1;
        transforms.scaleX = 1 * progress;
        transforms.scaleY = 1 * progress;
        transforms.translateX = -0.5 * progress;
      },
      duration: 600,
      delay: 0
    }));

    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        transforms.translateY = 7 * progress;
      },
      duration: 500,
      delay: 600,
    }));

    this.dropAnimations.push(new Animation({
      func: (progress) => {
        const {transforms} = this.objects.drop;
        const progressReversed = 1 - progress;
        transforms.scaleX = (0.5 * progressReversed) + 0.5;
        transforms.scaleY = (0.5 * progressReversed) + 0.5;
        transforms.translateX = -0.5 * progressReversed;
        this.objects.drop.opacity = 1 * progressReversed;
      },
      duration: 200,
      delay: 1100,
    }));

    this.dropAnimations.push(new Animation({
      func: () => {
        const {transforms} = this.objects.drop;
        transforms.translateY = 0;
      },
      duration: 100,
      delay: 1300,
    }));

    setTimeout(() => {
      this.dropAnimations.forEach((animation) => {
        animation.start();
      });
    }, delayStart);

    setTimeout(() => {
      this.initDropAnimations();
    }, interval);
  }
}
