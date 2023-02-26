precision highp float;

uniform sampler2D textureSampler;
uniform vec2 offset;

varying vec2 vUV;

void main(void)
{
    vec2 uv = vUV + offset;
    gl_FragColor = texture2D(textureSampler, uv); // vec4(1.0, 0.5, 0.2, 1.0);
}