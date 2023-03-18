precision highp float;

attribute vec3 position;
attribute vec2 uv;

uniform mat4 worldViewProjection;
uniform float uvScale;
uniform float noiseUvScale;

varying vec2 vUV;
varying vec2 vNoiseUV;

void main(void)
{
    gl_Position = worldViewProjection * vec4(position, 1.0);
    vUV = uv * uvScale;
    vNoiseUV = uv * noiseUvScale;
}
