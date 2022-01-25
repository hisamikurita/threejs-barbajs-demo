import {
  CountFadeUp,
  CountFadeOut
} from "../count";

const countTarget = document.querySelector('.num-count-03');

export const service = {
  namespace: 'service',

  beforeEnter() {
    CountFadeUp(countTarget);
    SPHERE._setNoise();
    SPHERE._setWireframeReset();
    STAGE._setCameraZ(0.18);
  },

  beforeLeave() {
    CountFadeOut(countTarget);
  }
};