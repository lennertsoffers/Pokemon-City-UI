import { Store } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useStore } from "react-redux";
import CityLoader from "./api/CityLoader";
import ModalContainer from "./components/Modals/ModalContainer";
import Toolbar from "./components/toolbar/Toolbar";
import World from "./components/world/map/World";

// TODO - When dragging, do not listen to other events that use the mouse

function App() {
    const store: Store = useStore();

    useEffect(() => {
        // axios
        //     .post("/auth/register", {
        //         username: "Lennert4",
        //         password: "ABCabc123!",
        //     })
        //     .then((response) => console.log(response));

        CityLoader.setup(store);
        CityLoader.initalize();
    });

    return (
        <div className="game">
            <World />
            <Toolbar />
            <ModalContainer />
        </div>
    );
}

export default App;
