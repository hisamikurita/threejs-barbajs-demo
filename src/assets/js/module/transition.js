export const transition = {
  name: 'transition',

  async leave(data) {
    await new Promise((resolve) => {
      return GSAP.to(data.current.container, {
        duration: CONSTANTS.baseDuration,
        ease: CONSTANTS.colorAndOpacity,
        opacity: 0,
        onComplete: () => resolve(),
      });
    });
  },

  enter(data) {
    GSAP.fromTo(data.next.container, {
      opacity: 0
    }, {
      duration: CONSTANTS.baseDuration,
      ease: CONSTANTS.colorAndOpacity,
      opacity: 1,
    });
  }
};