precision mediump float;

uniform float u_color_time;
uniform vec3 u_color_pallet[4];
uniform float u_color_switch_01;
uniform float u_color_switch_02;
uniform float u_color_switch_03;
uniform float u_color_switch_04;
varying vec2 vUv;
varying float vNoise;

/**
 * Referenced | https://iquilezles.org/www/articles/palettes/palettes.htm
 */
vec3 pal( in float t, in vec3 a, in vec3 b, in vec3 c, in vec3 d ) {
    return a + b * cos( 6.28318*(c*t+d) );
}

void main() {
    vec3 color = pal(
        (vUv.x + vUv.y) + u_color_time,
        vec3(u_color_pallet[0]) * (vNoise * u_color_switch_01 + 0.2),
        vec3(u_color_pallet[1]) * (vNoise + 0.1) * u_color_switch_02,
        vec3(u_color_pallet[2]) + vNoise * u_color_switch_03,
        vec3(u_color_pallet[3]) * 1.1 * u_color_switch_04
    );

    gl_FragColor = vec4(color, 1.0);
}