export function CountFadeUp(target) {
  return GSAP.fromTo(target, {
    y: 14,
  }, {
    duration: CONSTANTS.baseDuration,
    ease: CONSTANTS.transform,
    y: 0,
  });
}

export function CountFadeOut(target) {
  return GSAP.to(target, {
    duration: CONSTANTS.baseDuration,
    ease: CONSTANTS.transform,
    y: -14,
  });
}