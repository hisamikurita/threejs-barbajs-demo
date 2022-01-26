export function fontVariationSettings() {
  const text = document.querySelector('.title-02');
  const splitText = new SPLITTEXT(text, {
    type: "chars,words"
  });
  GSAP.utils.shuffle(splitText.chars);

  for (let i = 0; i < splitText.chars.length; i++) {
    GSAP.to(splitText.chars[i], {
      duration: 5.0,
      delay: -1 * GSAP.utils.random(1, 5, 1),
      ease: CONSTANTS.transform,
      repeat: -1,
      yoyo: true,
      fontVariationSettings: "'wght' " + 700,
    });
  }
}