import { Store } from "@reduxjs/toolkit";
import { useCallback, useEffect, useState } from "react";
import { useStore } from "react-redux";
import BuildableService from "./api/BuildableService";
import ServiceLoader from "./api/ServiceLoader";
import UserService from "./api/UserService";
import Hud from "./components/hud/Hud";
import Loading from "./components/Loading";
import ModalContainer from "./components/Modals/ModalContainer";
import Toolbar from "./components/toolbar/Toolbar";
import World from "./components/world/map/World";

// TODO - When dragging, do not listen to other events that use the mouse

function App() {
    const [loaded, setLoaded] = useState<boolean>(false);

    const store: Store = useStore();

    /**
     * Initializes all services that need the store
     * Loads the static data for buildables
     * Loads the buildables of the user
     * Loads the data of the logged in user
     */
    const loadGame = useCallback(async () => {
        ServiceLoader.initialize(store);

        await BuildableService.loadStaticBuildableData();
        await BuildableService.loadBuildables();
        await UserService.loadUserData();

        setLoaded(true);
    }, [store]);

    useEffect(() => {
        loadGame();
    }, [loadGame]);

    if (!loaded) return <Loading />;
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
