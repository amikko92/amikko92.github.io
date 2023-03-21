import {
    GroundMesh,
    MeshBuilder,
    Scene,
    ShaderMaterial,
    Texture,
    Vector2,
} from "@babylonjs/core";
import { Entity } from "./Entity";

export class Ocean implements Entity {
    private readonly mesh: GroundMesh;
    private readonly material: ShaderMaterial;

    private readonly waterOffset = new Vector2();
    private readonly waterVelocity = new Vector2(0.1, 0.1);

    private readonly noiseOffset = new Vector2();
    private readonly noiseVelocity = new Vector2(-0.1, 0.1);

    public constructor(
        scene: Scene,
        waterTexture: Texture,
        noiseTexture: Texture
    ) {
        this.mesh = MeshBuilder.CreateGround(
            "ocean",
            {
                width: 100,
                height: 100,
                subdivisions: 10,
            },
            scene
        );

        this.material = new ShaderMaterial("ocean_shader", scene, "./ocean", {
            attributes: ["position", "uv"],
            uniforms: [
                "worldViewProjection",
                "textureSampler",
                "offset",
                "uvScale",
                "noiseSampler",
                "noiseOffset",
                "noiseUvScale",
            ],
        });

        this.waterOffset = new Vector2();
        this.noiseOffset = new Vector2();

        this.material.backFaceCulling = false;
        this.material.setTexture("textureSampler", waterTexture);
        this.material.setVector2("offset", this.waterOffset);
        this.material.setFloat("uvScale", 2);

        this.material.setTexture("noiseSampler", noiseTexture);
        this.material.setVector2("noiseOffset", this.noiseOffset);
        this.material.setFloat("noiseUvScale", 2.5);

        this.mesh.material = this.material;
    }

    public update(deltaTime: number): void {
        this.waterOffset.x += deltaTime * this.waterVelocity.x;
        this.waterOffset.y += deltaTime * this.waterVelocity.y;
        this.noiseOffset.x += deltaTime * this.noiseVelocity.x;
        this.noiseOffset.y += deltaTime * this.noiseVelocity.y;
    }
}
