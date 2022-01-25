export const feature = {
  namespace: 'feature',

  beforeEnter() {
    SPHERE._setWireframe();
    STAGE._setCameraWireframe();
  },
};