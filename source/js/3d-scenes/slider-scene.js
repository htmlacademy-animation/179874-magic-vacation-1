import {Scene, PerspectiveCamera} from 'three';

const scene = new Scene();

const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
