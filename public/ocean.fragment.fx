precision highp float;

uniform sampler2D textureSampler;
uniform vec2 offset;
uniform vec2 tileSize;

varying vec2 vUV;

void main(void)
{
    vec2 uv = vUV + offset;
    gl_FragColor = texture2D(textureSampler, uv);
}
