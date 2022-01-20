import Animation from './utils/Animation';
import Scene2D from './utils/Scene2D';
import easings from './utils/easings';

const IMAGES_URLS = Object.freeze({
  key: `./img/module-4/lose-images/key.png`,
  crocodile: `./img/module-4/lose-images/crocodile.png`,
  drop: `./img/module-4/lose-images/drop.png`,
  flamingo: `./img/module-4/lose-images/flamingo.png`,
  leaf: `./img/module-4/lose-images/leaf.png`,
  saturn: `./img/module-4/lose-images/saturn.png`,
  snowflake: `./img/module-4/lose-images/snowflake.png`,
  watermelon: `./img/module-4/lose-images/watermelon.png`,
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
  flamingo: {
    imageId: `flamingo`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  leaf: {
    imageId: `leaf`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  saturn: {
    imageId: `saturn`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      translateY: 0
    }
  },
  snowflake: {
    imageId: `snowflake`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {
      rotate: 0
    }
  },
  watermelon: {
    imageId: `watermelon`,
    x: 50,
    y: 50,
    size: 0,
    opacity: 1,
    transforms: {}
  },
});

const LOCALS = Object.freeze({
  keyMask: {
    centerX: 50,
    centerY: 50,
  }
});

export default class LoseScene extends Scene2D {
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

  initCrocodileAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        this.objects.crocodile.transforms.translateX = 50 * progressReversed;
        this.objects.crocodile.transforms.translateY = -10 * progressReversed;
      },
      delay: 1000,
      duration: 1500,
      easing: easings.easeInCubic
    }));
  }

  initDropAnimations() {
    const delayStart = 3000;
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

  initFlamingoAnimations() {
    this.animations.push(new Animation({
      func: (progress) => {
        const {flamingo} = this.objects;

        flamingo.size = 20 * progress;
        flamingo.transforms.rotate = 50 * (1 - progress);
        flamingo.transforms.translateX = -25 * progress;
        flamingo.transforms.translateY = -12 * progress;
      },
      duration: 1000,
      delay: 200,
      easing: easings.easeOutCubic,
      callback: () => {
        const animation = new Animation({
          func: (progress) => {
            const flamingo = this.objects.flamingo;

            flamingo.transforms.translateY = -12 + 62 * progress;
            flamingo.opacity = (1 - progress);
          },
          duration: 800,
          easing: easings.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initLeafAnimations() {
    const {leaf} = this.objects;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        leaf.size = 25 * progress;
        leaf.transforms.rotate = 50 * progressReversed;
        leaf.transforms.translateX = 30 * progress;
        leaf.transforms.translateY = -20 * progress;
      },
      duration: 1000,
      delay: 200,
      easing: easings.easeOutCubic,
      callback: () => {
        const animation = new Animation({
          func: (progress) => {
            leaf.transforms.translateY = -20 + 70 * progress;
            leaf.opacity = (1 - progress);
          },
          duration: 800,
          easing: easings.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initSaturnAnimations() {
    const {saturn} = this.objects;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        saturn.size = 20 * progress;
        saturn.transforms.rotate = 50 * progressReversed;
        saturn.transforms.translateX = 28 * progress;
        saturn.transforms.translateY = 20 * progress;
      },
      duration: 1000,
      delay: 200,
      easing: easings.easeOutCubic,
      callback: () => {
        const animation = new Animation({
          func: (progress) => {
            saturn.transforms.translateY = 20 + 30 * progress;
            saturn.opacity = (1 - progress);
          },
          duration: 800,
          easing: easings.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initSnowflakeAnimations() {
    const {snowflake} = this.objects;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        snowflake.size = 15 * progress;
        snowflake.transforms.rotate = 50 * progressReversed;
        snowflake.transforms.translateX = 20 * progress;
        snowflake.transforms.translateY = 5 * progress;
      },
      duration: 1000,
      delay: 200,
      easing: easings.easeOutCubic,
      callback: () => {
        const animation = new Animation({
          func: (progress) => {
            snowflake.transforms.translateY = 5 + 45 * progress;
            snowflake.opacity = (1 - progress);
          },
          duration: 800,
          easing: easings.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }

  initWatermelonAnimations() {
    const {watermelon} = this.objects;

    this.animations.push(new Animation({
      func: (progress) => {
        const progressReversed = 1 - progress;

        watermelon.size = 20 * progress;
        watermelon.transforms.rotate = 50 * progressReversed;
        watermelon.transforms.translateX = -35 * progress;
        watermelon.transforms.translateY = 20 * progress;
      },
      duration: 1000,
      delay: 200,
      easing: easings.easeOutCubic,
      callback: () => {
        const animation = new Animation({
          func: (progress) => {
            watermelon.transforms.translateY = 20 + 30 * progress;
            watermelon.opacity = (1 - progress);
          },
          duration: 800,
          easing: easings.easeInCubic
        });

        animation.start();
        this.animations.push(animation);
      }
    }));
  }
}
