import {
  gsap
} from 'gsap/all';
import {
  CustomEase
} from './module/CustomEase';
import {
  SplitText
} from './module/SplitText';
window.GSAP = gsap;
window.CUSTOMEASE = CustomEase;
window.SPLITTEXT = SplitText;
GSAP.registerPlugin(CUSTOMEASE, SPLITTEXT);