import { AssetsManager, Mesh, Scene } from "@babylonjs/core";

export const loadAssets = async (scene: Scene) => {
    const assetsManager = new AssetsManager(scene);

    const waterTask = assetsManager.addTextureTask(
        "water_task",
        "textures/water-low.png"
    );

    const noiseTask = assetsManager.addTextureTask(
        "noise_task",
        "textures/noiseTexture.png"
    );

    const islandTask = assetsManager.addMeshTask(
        "island_task",
        "",
        "./",
        "island.glb"
    );

    await assetsManager.loadAsync();

    return {
        textures: {
            water: waterTask.texture,
            noise: noiseTask.texture,
        },
        meshes: {
            island: islandTask.loadedMeshes as Mesh[],
        },
    };
};
