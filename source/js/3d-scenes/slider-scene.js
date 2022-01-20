import * as THREE from 'three';

export default class SliderScene {
  constructor() {
    this._innerWidth = window.innerWidth;
    this._innerHeight = window.innerHeight;

    this._fov = 45;
    this._aspect = this.innerWidth / this.innerHeight;
    this._near = 0.1;
    this._far = 1000;

    this._requestAnimationId = null;

    this.start = this.start.bind(this);
  }

  _init() {
    this._scene = new THREE.Scene();
    this._camera = new THREE.PerspectiveCamera(this._fov, this._aspect, this._near, this._far);
    this._textureLoader = new THREE.TextureLoader();

    this._canvasElem = document.querySelector(`#slider-scene`);
    this._renderer = new THREE.WebGLRenderer({canvas: this._canvasElem});
    this._renderer.setSize(this._innerWidth, this._innerHeight);

    this.setBackground();
  }

  setBackground(idx = 0) {
    const textures = [
      `../../img/module-5/scenes-textures/scene-1.png`,
      `../../img/module-5/scenes-textures/scene-2.png`,
      `../../img/module-5/scenes-textures/scene-3.png`,
      `../../img/module-5/scenes-textures/scene-4.png`,
    ];
    const bgTexture = this._textureLoader.load(textures[idx]);
    this._scene.background = bgTexture;
  }

  stop() {
    if (this._requestAnimationId) {
      cancelAnimationFrame(this._requestAnimationId);
    }
  }

  start() {
    if (!this._scene) {
      this._init();
    }

    if (this._requestAnimationId) {
      requestAnimationFrame(this.start);
    } else {
      this._requestAnimationId = requestAnimationFrame(this.start);
    }

    this._renderer.render(this._scene, this._camera);
  }
}
