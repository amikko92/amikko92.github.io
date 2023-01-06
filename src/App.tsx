import { BabylonCanvas } from "./components/BabylonCanvas";
import { HelloWorld } from "./components/HelloWorld";

export const App = () => {
    return (
        <div id="app">
            <BabylonCanvas />
            <HelloWorld />
        </div>
    );
};
