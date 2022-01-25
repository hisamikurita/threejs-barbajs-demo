export const index = {
  namespace: 'index',

  beforeEnter() {
    SPHERE._setNoise();
    SPHERE._setWireframeReset();
    STAGE._setCameraReset();
  },
};