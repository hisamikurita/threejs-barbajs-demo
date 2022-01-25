precision mediump float;

attribute vec3 position;
attribute vec3 normal;
attribute vec2 uv;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_noise_length;
uniform float u_noise_power;
uniform float u_noise_range;
uniform float u_noise_time;
varying vec2 vUv;
varying float vNoise;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main() {
    vUv = uv;
    vec3 newPosition = position;
    float noiseLength = u_noise_length;
    float noisePower = u_noise_power;
    float noiseRange = u_noise_range;
    float noise = cnoise3(noiseLength * vec3(position.x, position.y, position.z + u_noise_time * 0.010));
    vNoise = noise;
    newPosition += noiseRange * ((noise * noisePower) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}