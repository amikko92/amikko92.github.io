import {
    Engine,
    Scene,
    Vector3,
    HemisphericLight,
    UniversalCamera,
    TransformNode,
    Mesh,
    Quaternion,
    DirectionalLight,
    ShadowGenerator,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";
import { loadAssets } from "./AssetLoader";
import { Entity } from "./Entity";
import { Ocean } from "./Ocean";

export class BabylonApp {
    private readonly canvas: HTMLCanvasElement;

    private engine: Engine;
    private scene: Scene;

    private entities: Entity[];
    private islands: TransformNode[];

    private onResize: () => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
        this.entities = [];
        this.islands = [];

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
        this.entities.push(ocean);
        this.setupIslands(meshes.island);

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

    private setupIslands(islandMeshes: Mesh[]): void {
        const sourceMeshes = islandMeshes.filter(
            (mesh) => mesh.geometry !== null
        );
        sourceMeshes.forEach((mesh) => {
            mesh.setParent(null);
            mesh.isVisible = false;
            mesh.receiveShadows = true;
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
        const deltaTime = this.scene.deltaTime
            ? this.scene.deltaTime * 0.001
            : 0;

        for (const entity of this.entities) {
            entity.update(deltaTime);
        }
        this.islands.forEach((island) => {
            island.rotateAround(Vector3.Zero(), Vector3.Up(), 0.1 * deltaTime);
        });
        this.scene.render();
    }
}
