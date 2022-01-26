precision mediump float;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform float u_particle_time;

#pragma glslify: cnoise3 = require(glsl-noise/classic/3d);

void main() {
    vec3 pos = position;
    float noise = cnoise3((uv.x + uv.y) * 10.0 * vec3(position.x, position.y + u_particle_time * 0.0010, position.z));
    pos += (noise * normal) * length(uv - vec2(0.5,0.5)) * 100.0;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos.x, pos.y, 0.0, 1.0);
    gl_PointSize = 5.0;
}