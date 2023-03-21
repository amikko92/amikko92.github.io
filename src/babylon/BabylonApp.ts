import {
    Engine,
    Scene,
    Vector3,
    HemisphericLight,
    UniversalCamera,
    DirectionalLight,
    ShadowGenerator,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { loadAssets } from "./AssetLoader";
import { Entity } from "./Entity";
import { Islands } from "./Islands";
import { Ocean } from "./Ocean";

export class BabylonApp {
    private readonly canvas: HTMLCanvasElement;

    private engine: Engine;
    private scene: Scene;
    private entities: Entity[];

    private onResize: () => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.entities = [];

        this.onResize = this.resize.bind(this);
        window.addEventListener("resize", this.onResize);

        this.scene = new Scene(this.engine);
        this.initDebug(this.scene);
        this.setupScene();
    }

    public dispose(): void {
        window.removeEventListener("resize", this.onResize);
        this.engine.dispose();
    }

    public resize(): void {
        this.engine.resize();
    }

    private async initDebug(scene: Scene): Promise<void> {
        if (import.meta.env.DEV) {
            const babylonDebug = await import("./BabylonDebug");
            babylonDebug.initDebug(scene);
        }
    }

    public async setupScene(): Promise<void> {
        const { textures, meshes } = await loadAssets(this.scene);

        const ocean = new Ocean(this.scene, textures.water, textures.noise);
        const islands = new Islands(meshes.island);
        this.entities.push(ocean, islands);

        const camera = new UniversalCamera(
            "camera",
            new Vector3(0, 10, -30),
            this.scene
        );
        camera.setTarget(new Vector3(0, 0, 0));
        camera.attachControl(this.canvas);

        const hemiLight = new HemisphericLight(
            "hemi_light",
            new Vector3(0, 1, 0),
            this.scene
        );
        hemiLight.intensity = 1;

        const dirLight = new DirectionalLight(
            "dir_light",
            new Vector3(1, -1, 0),
            this.scene
        );
        dirLight.position = new Vector3(0, 20, 0);
        dirLight.intensity = 3;

        const shadowGenerator = new ShadowGenerator(1024, dirLight);
        shadowGenerator.usePoissonSampling = false;
        shadowGenerator.getShadowMap()?.renderList?.push(...this.scene.meshes);

        this.engine.runRenderLoop(this.render.bind(this));
    }

    private render(): void {
        const deltaTime = this.scene.deltaTime
            ? this.scene.deltaTime * 0.001
            : 0;
        for (const entity of this.entities) {
            entity.update(deltaTime);
        }
        this.scene.render();
    }
}
