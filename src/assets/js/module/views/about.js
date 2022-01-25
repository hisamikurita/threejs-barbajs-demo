import {
  CountFadeUp,
  CountFadeOut
} from "../count";

const countTarget = document.querySelector('.num-count-02');

export const about = {
  namespace: 'about',

  beforeEnter() {
    CountFadeUp(countTarget);
    SPHERE._setSphere();
    SPHERE._setWireframeReset();
    STAGE._setCameraReset();
  },

  beforeLeave() {
    CountFadeOut(countTarget);
  }
};