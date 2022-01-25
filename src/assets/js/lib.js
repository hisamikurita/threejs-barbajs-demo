import {
  gsap
} from 'gsap/all';
import {
  CustomEase
} from './module/CustomEase';
window.GSAP = gsap;
window.CUSTOMEASE = CustomEase;
GSAP.registerPlugin(CUSTOMEASE);