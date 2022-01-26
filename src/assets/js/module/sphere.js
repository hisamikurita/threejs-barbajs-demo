import {
  SphereBufferGeometry,
  RawShaderMaterial,
  Mesh,
  Color,
  Points
  // Vector2
} from 'three';
// import {
//   EffectComposer
// } from 'three/examples/jsm/postprocessing/EffectComposer.js';
// import {
//   RenderPass
// } from 'three/examples/jsm/postprocessing/RenderPass.js';
// import {
//   UnrealBloomPass
// } from 'three/examples/jsm/postprocessing/UnrealBloomPass';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';
import pVertexShader from './shaders/pvertexshader.vert';
import pFragmentShader from './shaders/pfragmentshader.frag';

export default class Sphere {
  constructor(stage) {
    this.stage = stage;

    this.colorPallet = [
      '#ff0000',
      '#ffffff',
      '#30ff00',
      '#ffa600',
    ];
    this.u_colorPallet = [];
    for (let i = 0; i < this.colorPallet.length; i++) {
      this.u_colorPallet.push(new Color(this.colorPallet[i]));
    }
    this.mouse = {
      x: 0,
      y: 0,
      friction: 30,
      range: 0.5,
    };
    this.speed = {
      color: 0.02,
      noise: 0.02,
    };
    this.mesh = null;

    // this.composer = new EffectComposer(this.stage.renderer);
    // this.composer.addPass(new RenderPass(this.stage.scene, this.stage.camera));
    // this.UnrealBloomPass = new UnrealBloomPass(new Vector2(this.stage.width, this.stage.height), 0.4, 1.4, 0.0);
    // this.composer.addPass(this.UnrealBloomPass);
  }

  init() {
    this._setMesh();
    this._setDev();
  }

  _setMesh() {
    const geometry = new SphereBufferGeometry(0.22, 52, 52);
    const material = new RawShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        u_noise_length: {
          type: "f",
          value: 0
        },
        u_noise_power: {
          type: "f",
          value: 0
        },
        u_noise_range: {
          type: "f",
          value: 0
        },
        u_color_pallet: {
          type: "v3v",
          value: this.u_colorPallet
        },
        u_noise_time: {
          type: "f",
          value: this.speed.noise
        },
        u_color_time: {
          type: "f",
          value: this.speed.color
        },
        u_color_switch_01: {
          type: "f",
          value: 1
        },
        u_color_switch_02: {
          type: "f",
          value: 1
        },
        u_color_switch_03: {
          type: "f",
          value: 0
        },
        u_color_switch_04: {
          type: "f",
          value: 1
        },
      },
      transparent: true,
      wireframe: false,
    });
    this.mesh = new Mesh(geometry, material);

    const scaleDeveiceRatio = window.innerWidth > 767 ? 1 : 0.62;
    this.mesh.scale.set(scaleDeveiceRatio, scaleDeveiceRatio, scaleDeveiceRatio);

    //particle
    const particleGeo = new SphereBufferGeometry(0.22, 52, 52);
    const particleMat = new RawShaderMaterial({
      vertexShader: pVertexShader,
      fragmentShader: pFragmentShader,
      uniforms: {
        u_particle_noise_length: {
          type: "f",
          value: 20
        },
        //   u_noise_power: {
        //     type: "f",
        //     value: 0
        //   },
        //   u_noise_range: {
        //     type: "f",
        //     value: 0
        //   },
        //   u_color_pallet: {
        //     type: "v3v",
        //     value: this.u_colorPallet
        //   },
        //   u_noise_time: {
        //     type: "f",
        //     value: this.speed.noise
        //   },
        u_particle_time: {
          type: "f",
          value: this.speed.color
        },
      },
      transparent: true,
      wireframe: false,
    });
    this.particle = new Points(particleGeo, particleMat);
    // this.stage.scene.add(this.particle);
    this.stage.scene.add(this.mesh);

    console.log(this.particle);
  }

  _setNoise() {
    GSAP.to(this.mesh.material.uniforms.u_noise_length, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 100,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_power, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 1,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_range, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 0.15,
    });
    GSAP.to(this.mesh.position, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      y: 0,
    });
  }

  _setScale() {
    GSAP.to(this.mesh.material.uniforms.u_noise_length, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      repeat: 1,
      yoyo: true,
      value: 90,
    });
    // GSAP.to(this.mesh.material.uniforms.u_noise_range, {
    //   duration: CONSTANTS.fullDuration,
    //   ease: CONSTANTS.transform,
    //   repeat: 1,
    //   yoyo: true,
    //   value: 0.3,
    // });
    GSAP.to(this.mesh.material.uniforms.u_noise_range, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      repeat: 1,
      yoyo: true,
      value: 0.3,
    });
  }

  _setSphere() {
    GSAP.to(this.mesh.material.uniforms.u_noise_length, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 80,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_power, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 0,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_range, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 0,
    });
    GSAP.to(this.mesh.position, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      y: 0,
    });
  }

  _setWireframe() {
    const positionDeveiceRatio = window.innerWidth > 767 ? -0.22 : -0.14;

    GSAP.to(this.mesh.material.uniforms.u_noise_length, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 80,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_power, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 1,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_range, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      value: 0.06,
    });
    GSAP.to(this.mesh.position, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.transform,
      y: positionDeveiceRatio,
    });

    this.mesh.material.wireframe = true;
  }

  _setWireframeReset() {
    this.mesh.material.wireframe = false;
  }

  _setDev() {
    const parameter = {
      color_01: this.colorPallet[0],
      color_02: this.colorPallet[1],
      color_03: this.colorPallet[2],
      color_04: this.colorPallet[3],
    };
    const gui = new dat.GUI();
    gui.addColor(parameter, "color_01")
      .name("mesh color 01")
      .onChange((value) => {
        this.mesh.material.uniforms.u_color_pallet.value[0] = new Color(value);
      });
    gui.addColor(parameter, "color_02")
      .name("mesh color 02")
      .onChange((value) => {
        this.mesh.material.uniforms.u_color_pallet.value[1] = new Color(value);
      });
    gui.addColor(parameter, "color_03")
      .name("mesh color 03")
      .onChange((value) => {
        this.mesh.material.uniforms.u_color_pallet.value[2] = new Color(value);
      });
    gui.addColor(parameter, "color_04")
      .name("mesh color 04")
      .onChange((value) => {
        this.mesh.material.uniforms.u_color_pallet.value[3] = new Color(value);
      });
  }

  _render() {
    this.mesh.material.uniforms.u_noise_time.value += this.speed.noise;
    this.particle.material.uniforms.u_particle_time.value += 0.020;
    this.mesh.material.uniforms.u_color_time.value += this.speed.color;

    this.mesh.rotation.x += (this.mouse.y - this.mesh.rotation.x) / this.mouse.friction;
    this.mesh.rotation.y += ((this.mouse.x - this.mesh.rotation.y) / this.mouse.friction);

    // this.composer.render();
  }

  onOpenning() {
    this.opAnimation01 = GSAP.to(this.mesh.material.uniforms.u_noise_length, {
      duration: CONSTANTS.openningDuration,
      ease: CONSTANTS.transform,
      value: 80,
    });
    this.opAnimation02 = GSAP.to(this.mesh.material.uniforms.u_noise_power, {
      duration: CONSTANTS.openningDuration,
      ease: CONSTANTS.transform,
      value: 1,
    });
    this.opAnimation03 = GSAP.to(this.mesh.material.uniforms.u_noise_range, {
      duration: CONSTANTS.openningDuration,
      ease: CONSTANTS.transform,
      value: 0.15,
    });
  }

  onOpenningStop() {
    this.opAnimation01.kill();
    this.opAnimation02.kill();
    this.opAnimation03.kill();
  }

  onClick() {
    GSAP.to(this.mesh.material.uniforms.u_color_switch_01, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.colorAndOpacity,
      value: Math.random() * 2.0,
    });
    GSAP.to(this.mesh.material.uniforms.u_color_switch_02, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.colorAndOpacity,
      value: Math.random() * 2.0,
    });
    GSAP.to(this.mesh.material.uniforms.u_color_switch_03, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.colorAndOpacity,
      value: Math.random() * 2.0,
    });
    GSAP.to(this.mesh.material.uniforms.u_color_switch_04, {
      duration: CONSTANTS.fullDuration,
      ease: CONSTANTS.colorAndOpacity,
      value: Math.random() * 2.0,
    });
  }

  onResize() {
    //
  }

  onMouseMove(e) {
    this.mouse.x = this.mouse.range * ((e.clientX / window.innerWidth) * 2 - 1);
    this.mouse.y = this.mouse.range * ((e.clientY / window.innerHeight) * 2 - 1);
  }

  onRaf() {
    this._render();
  }
}