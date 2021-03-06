import barba from '@barba/core';
import Sphere from './module/sphere';
import Stage from './module/stage';
import {
  ReplaceBody,
  ReplaceHead
} from './module/utils/replace';
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
import {
  fontVariationSettings
} from './module/font';

window.STAGE = new Stage();
STAGE.init();

window.SPHERE = new Sphere(STAGE);
SPHERE.init();

window.OPANIMATIONSWITCH = false;

if (document.body.classList.contains('index')) {
  OPANIMATIONSWITCH = true;
}

fontVariationSettings();

window.addEventListener('mousemove', (e) => {
  SPHERE.onMouseMove(e);
});

window.addEventListener('click', () => {
  SPHERE.onClick();
});

window.addEventListener("resize", () => {
  STAGE.onResize();
  SPHERE.onResize();
});

const _raf = () => {
  STAGE.onRaf();
  SPHERE.onRaf();
};

GSAP.ticker.add(_raf);
GSAP.ticker.fps(30);

barba.init({
  views: [index, about, service, feature],
  transitions: [transition],
});

barba.hooks.beforeEnter((data) => {
  ReplaceBody(data);
  ReplaceHead(data);
});