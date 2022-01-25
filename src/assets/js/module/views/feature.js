import {
  CountFadeUp,
  CountFadeOut
} from "../count";

const countTarget = document.querySelector('.num-count-04');

export const feature = {
  namespace: 'feature',

  beforeEnter() {
    CountFadeUp(countTarget);
    SPHERE._setWireframe();
    STAGE._setCameraWireframe();
  },

  beforeLeave() {
    CountFadeOut(countTarget);
  }
};