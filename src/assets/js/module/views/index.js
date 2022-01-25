import {
  CountFadeUp,
  CountFadeOut
} from "../count";

const countTarget = document.querySelector('.num-count-01');

export const index = {
  namespace: 'index',

  beforeEnter() {
    CountFadeUp(countTarget);
    if (OPANIMATIONSWITCH) {
      SPHERE.onOpenning();
    } else {
      SPHERE._setNoise();
    }
    SPHERE._setWireframeReset();
    STAGE._setCameraReset();
  },

  beforeLeave() {
    CountFadeOut(countTarget);
    SPHERE.onOpenningStop();
    OPANIMATIONSWITCH = false;
  }
};