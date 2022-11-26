import {
    Engine,
    Scene,
    Vector3,
    HemisphericLight,
    UniversalCamera,
    SceneLoader,
    ISceneLoaderAsyncResult,
    TransformNode,
    Mesh,
    Quaternion,
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
        const { meshes } = await this.loadAssets();
        this.setupIslands(meshes as Mesh[]);

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

    private setupIslands(meshes: Mesh[]): void {
        const sourceMeshes = meshes.filter((mesh) => mesh.geometry !== null);
        sourceMeshes.forEach((mesh) => {
            mesh.setParent(null);
            mesh.isVisible = false;
        });

        for (let i = 0; i < 10; i++) {
            const node = new TransformNode(`island${i}`);
            sourceMeshes.forEach((mesh) => {
                mesh.setParent(null);
                const instance = mesh.createInstance(
                    `${mesh.name}_instance${i}`
                );
                instance.setParent(node);
            });

            const rot = Quaternion.FromEulerAngles(0, 36 * i, 0);
            const vec = new Vector3();
            Vector3.Forward().rotateByQuaternionToRef(rot, vec);
            vec.scaleInPlace(10);
            node.position = vec;

            this.islands.push(node);
        }
    }

    private render(): void {
        const dt = this.scene.deltaTime ? this.scene.deltaTime : 0;
        this.islands.forEach((island) => {
            island.rotateAround(Vector3.Zero(), Vector3.Up(), 0.0001 * dt);
        });
        this.scene.render();
    }
}
