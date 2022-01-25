import barba from '@barba/core';
import Sphere from './module/sphere';
import Stage from './module/stage';
import {
  index
} from './module/views/index';
import {
  about
} from './module/views/about';
import {
  service
} from './module/views/service';
import {
  feature
} from './module/views/feature';
import {
  transition
} from './module/transition';

window.STAGE = new Stage();
STAGE.init();

window.SPHERE = new Sphere(STAGE);
SPHERE.init();

window.FIRSTLOAD = false;

window.addEventListener('load', () => {
  // if (location.href) {
  //   SPHERE.onOpenning();
  // }
  FIRSTLOAD = true;
});

window.addEventListener('mousemove', (e) => {
  SPHERE.onMouseMove(e);
});

window.addEventListener("resize", () => {
  SPHERE.onResize();
  STAGE.onResize();
});

const _raf = () => {
  SPHERE.onRaf();
  STAGE.onRaf();
};

GSAP.ticker.add(_raf);
GSAP.ticker.fps(30);

barba.init({
  views: [index, about, service, feature],
  transitions: [transition],
});