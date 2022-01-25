import {
  SphereBufferGeometry,
  RawShaderMaterial,
  Mesh,
  Color
} from 'three';
import * as dat from 'dat.gui';
import vertexShader from './shaders/vertexshader.vert';
import fragmentShader from './shaders/fragmentshader.frag';

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
      },
      transparent: true,
      wireframe: false,
    });
    this.mesh = new Mesh(geometry, material);
    this.stage.scene.add(this.mesh);

    console.log(this.mesh);
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
      y: -0.22,
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
    this.mesh.material.uniforms.u_color_time.value += this.speed.color;

    this.mesh.rotation.x += (this.mouse.y - this.mesh.rotation.x) / this.mouse.friction;
    this.mesh.rotation.y += ((this.mouse.x - this.mesh.rotation.y) / this.mouse.friction);
  }

  onOpenning() {
    GSAP.to(this.mesh.material.uniforms.u_noise_length, {
      duration: CONSTANTS.openningDuration,
      ease: CONSTANTS.transform,
      value: 80,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_power, {
      duration: CONSTANTS.openningDuration,
      ease: CONSTANTS.transform,
      value: 1,
    });
    GSAP.to(this.mesh.material.uniforms.u_noise_range, {
      duration: CONSTANTS.openningDuration,
      ease: CONSTANTS.transform,
      value: 0.15,
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