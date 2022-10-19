import {
    Engine,
    Scene,
    Vector3,
    HemisphericLight,
    UniversalCamera,
    SceneLoader,
    ISceneLoaderAsyncResult,
    TransformNode,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

export class BabylonApp {
    private readonly canvas: HTMLCanvasElement;

    private engine: Engine;
    private scene: Scene;

    private islands: TransformNode[];

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.islands = [];

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.scene = new Scene(this.engine);
        this.initDebug(this.scene);

        this.setupScene();
    }

    private async initDebug(scene: Scene): Promise<void> {
        if (import.meta.env.DEV) {
            const babylonDebug = await import("./BabylonDebug");
            babylonDebug.initDebug(scene);
        }
    }

    private async loadAssets(): Promise<ISceneLoaderAsyncResult> {
        return await SceneLoader.ImportMeshAsync("", "./", "island.glb");
    }

    private async setupScene(): Promise<void> {
        const { transformNodes } = await this.loadAssets();
        this.setupIslands(transformNodes[0]);

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

        this.engine.runRenderLoop(this.render.bind(this));
    }

    private setupIslands(islandNode: TransformNode): void {
        islandNode.name = "island0";
        islandNode.position.x = 7;
        this.islands.push(islandNode);

        const island1 = islandNode.clone("island1", this.scene.rootNodes[0]);
        if (island1) {
            island1.position.x = -7;
            island1.addRotation(0, Math.PI, 0);
            this.islands.push(island1);
        }
    }

    private render(): void {
        const dt = this.scene.deltaTime ? this.scene.deltaTime : 0;
        this.islands.forEach((island) => {
            island.rotate(Vector3.Up(), 0.0001 * dt);
        });
        this.scene.render();
    }
}
