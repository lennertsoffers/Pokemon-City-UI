import { Store } from "@reduxjs/toolkit";
import { useEffect } from "react";
import { useStore } from "react-redux";
import BuildableService from "./api/BuildableService";
import CityLoader from "./api/CityLoader";
import UserService from "./api/UserService";
import Hud from "./components/hud/Hud";
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
        BuildableService.initalize(store);
        UserService.initialize(store);

        UserService.loadUserData();
        CityLoader.initalize();
    });

    return (
        <div className="game">
            <World />
            <Hud />
            <Toolbar />
            <ModalContainer />
        </div>
    );
}

export default App;
