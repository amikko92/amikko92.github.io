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
    MeshBuilder,
    StandardMaterial,
    AssetsManager,
    TextureAssetTask,
    Texture,
    MeshAssetTask,
} from "@babylonjs/core";
import "@babylonjs/loaders/glTF";

export class BabylonApp {
    private readonly canvas: HTMLCanvasElement;

    private engine: Engine;
    private scene: Scene;

    private waterTexture?: Texture;
    private islandMeshes?: Mesh[];
    private islands: TransformNode[];

    private onResize: () => void;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.engine = new Engine(this.canvas, true);
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

    private async loadAssets(): Promise<void> {
        const assetsManager = new AssetsManager(this.scene);

        const waterTask = assetsManager.addTextureTask(
            "water_task",
            "water.png"
        );
        waterTask.onSuccess = (task: TextureAssetTask) => {
            this.waterTexture = task.texture;
        };

        const islandTask = assetsManager.addMeshTask(
            "island_task",
            "",
            "./",
            "island.glb"
        );
        islandTask.onSuccess = (task: MeshAssetTask) => {
            this.islandMeshes = task.loadedMeshes as Mesh[];
        };

        await assetsManager.loadAsync();
    }

    private async setupScene(): Promise<void> {
        await this.loadAssets();
        this.setupOcean();
        this.setupIslands();

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
        shadowGenerator.usePoissonSampling = true;
        shadowGenerator.getShadowMap()?.renderList?.push(...this.scene.meshes);

        this.engine.runRenderLoop(this.render.bind(this));
    }

    private setupOcean(): void {
        const ocean = MeshBuilder.CreateGround(
            "ocean",
            {
                width: 100,
                height: 100,
                subdivisions: 10,
            },
            this.scene
        );

        const oceanMaterial = new StandardMaterial(
            "ocean_material",
            this.scene
        );
        oceanMaterial.disableLighting = true;
        oceanMaterial.backFaceCulling = true;
        if (this.waterTexture) {
            this.waterTexture.uScale = 5;
            this.waterTexture.vScale = 5;
            oceanMaterial.emissiveTexture = this.waterTexture;
        }
        ocean.material = oceanMaterial;
    }

    private setupIslands(): void {
        if (!this.islandMeshes) {
            throw new Error("Island meshes not loaded");
        }
        const sourceMeshes = this.islandMeshes.filter(
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
        const dt = this.scene.deltaTime ? this.scene.deltaTime * 0.001 : 0;
        if (this.waterTexture) {
            this.waterTexture.uOffset += dt * 0.1;
            this.waterTexture.vOffset += dt * 0.1;
        }
        this.islands.forEach((island) => {
            island.rotateAround(Vector3.Zero(), Vector3.Up(), 0.1 * dt);
        });
        this.scene.render();
    }
}
