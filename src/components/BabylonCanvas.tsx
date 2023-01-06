import { useEffect, useRef } from "react";
import { BabylonApp } from "../babylon/BabylonApp";

export const BabylonCanvas = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) {
            console.error("Canvas element not found");
            return;
        }

        const babylonApp = new BabylonApp(canvas);

        return () => {
            babylonApp.dispose();
        };
    });
    return <canvas ref={canvasRef} />;
};
