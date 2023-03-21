import { Mesh, Quaternion, TransformNode, Vector3 } from "@babylonjs/core";
import { Entity } from "./Entity";

export class Islands implements Entity {
    private islandNodes: TransformNode[];

    public constructor(islandMeshes: Mesh[]) {
        this.islandNodes = [];

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

            this.islandNodes.push(node);
        }
    }

    public update(deltaTime: number): void {
        for (const islandNode of this.islandNodes) {
            islandNode.rotateAround(
                Vector3.Zero(),
                Vector3.Up(),
                0.1 * deltaTime
            );
        }
    }
}
