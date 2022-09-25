import { KeyboardEventTypes, Scene } from "@babylonjs/core";
import "@babylonjs/core/Debug/debugLayer";
import "@babylonjs/inspector";

export const initDebug = (scene: Scene) => {
    scene.onKeyboardObservable.add((keyboardInfo) => {
        const { type, event } = keyboardInfo;
        if (type !== KeyboardEventTypes.KEYUP || event.code !== "KeyI") {
            return;
        }
        scene.debugLayer.isVisible() ? hideDebug(scene) : showDebug(scene);
    });
};

const showDebug = (scene: Scene) => {
    if (scene.debugLayer.isVisible()) {
        return;
    }
    scene.debugLayer.show({
        overlay: true,
    });
};

const hideDebug = (scene: Scene) => {
    if (!scene.debugLayer.isVisible()) {
        return;
    }
    scene.debugLayer.hide();
};
