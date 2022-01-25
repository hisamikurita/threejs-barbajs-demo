export const about = {
  namespace: 'about',

  beforeEnter() {
    SPHERE._setSphere();
    SPHERE._setWireframeReset();
    STAGE._setCameraReset();
  },
};