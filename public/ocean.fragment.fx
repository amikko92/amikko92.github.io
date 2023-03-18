precision highp float;

// Base texture
uniform sampler2D textureSampler;
uniform vec2 offset;

// Noise texture
uniform sampler2D noiseSampler;
uniform vec2 noiseOffset;

varying vec2 vUV;
varying vec2 vNoiseUV;

void main(void)
{
    vec2 noiseUv = vNoiseUV + noiseOffset;
    vec2 noise = texture2D(noiseSampler, noiseUv).xy;

    vec2 uv = vUV + offset + noise;
    vec4 baseTexture = texture2D(textureSampler, uv);

    gl_FragColor = baseTexture;
}
