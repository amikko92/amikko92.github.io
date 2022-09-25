import {
    Engine,
    Scene,
    Vector3,
    HemisphericLight,
    MeshBuilder,
    UniversalCamera,
    Mesh,
} from "@babylonjs/core";

export class BabylonApp {
    private readonly canvas: HTMLCanvasElement;

    private engine: Engine;
    private scene: Scene;
    private camera: UniversalCamera;

    private box: Mesh;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);

        window.addEventListener("resize", () => {
            this.engine.resize();
        });

        this.scene = new Scene(this.engine);
        this.initDebug(this.scene);

        this.camera = new UniversalCamera(
            "camera",
            new Vector3(0, 0, -5),
            this.scene
        );
        this.camera.setTarget(new Vector3(0, 0, 0));
        this.camera.attachControl(this.canvas);

        const hemiLight = new HemisphericLight(
            "hemi_light",
            new Vector3(0, 1, 0),
            this.scene
        );
        hemiLight.intensity = 1;

        this.box = MeshBuilder.CreateBox("box", { size: 2 }, this.scene);
        this.box.position = new Vector3(0, 0, 0);

        this.engine.runRenderLoop(this.render.bind(this));
    }

    private async initDebug(scene: Scene) {
        if (import.meta.env.DEV) {
            const babylonDebug = await import("./BabylonDebug");
            babylonDebug.initDebug(scene);
        }
    }

    private render(): void {
        const dt = this.scene.deltaTime ? this.scene.deltaTime : 0;
        this.box.rotation.y += 0.001 * dt;
        this.scene.render();
    }
}
