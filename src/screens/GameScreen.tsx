import { Store } from "@reduxjs/toolkit";
import { useState, useCallback, useEffect } from "react";
import { useSelector, useStore } from "react-redux";
import { Navigate } from "react-router-dom";
import DataLoader from "../api/DataLoader";
import Hud from "../components/hud/Hud";
import Loading from "../components/Loading";
import ModalContainer from "../components/modals/ModalContainer";
import World from "../components/world/map/World";
import CombinedState from "../types/interfaces/states/CombinedState";

/** The main game screen */
const GameScreen = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const loggedIn = useSelector((state: CombinedState) => state.authState.loggedIn);

    const store: Store = useStore();

    /**
     * Initializes all services that need the store
     * Loads the static data for buildables
     * Loads the buildables of the user
     * Loads the roads of the user
     * Loads the data of the logged in user
     */
    const loadGame = useCallback(async () => {
        DataLoader.initialize(store);

        const loadedStaticData = await DataLoader.loadStaticBuildableData();
        if (!loadedStaticData) return;

        const loadedBuildables = await DataLoader.loadBuildables();
        if (!loadedBuildables) return;

        const loadedRoads = await DataLoader.loadRoads();
        if (!loadedRoads) return;

        const loadedUserData = await DataLoader.loadUserData();
        if (!loadedUserData) return;

        setLoading(false);
    }, [store]);

    // Load the data on startup of the game
    useEffect(() => {
        loadGame();
    }, [loadGame]);

    // If the user is not authenticated, redirect to the login page
    if (!loggedIn) return <Navigate to="/login" />;
    // If the game is still loading, show the loading screen
    if (loading) return <Loading />;
    return (
        <div className="game">
            <World />
            <Hud />
            <ModalContainer />
        </div>
    );
};

export default GameScreen;
