export const service = {
  namespace: 'service',

  beforeEnter() {
    SPHERE._setNoise();
    SPHERE._setWireframeReset();
    STAGE._setCameraZ(0.18);
  },
};