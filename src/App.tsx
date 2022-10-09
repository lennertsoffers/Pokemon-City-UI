import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalContainer from "./components/Modals/ModalContainer";
import Toolbar from "./components/toolbar/Toolbar";
import World from "./components/world/map/World";
import BuildablePlacement from "./types/interfaces/world/BuildablePlacement";
import { LOAD_BUILDINGS } from "./redux/actions/BuildablePlacementActions";
import { LOAD_STATIC_COMPANY_DATA, LOAD_STATIC_DECORATION_DATA, LOAD_STATIC_HOUSE_DATA } from "./redux/actions/StaticDataActions";
import { HOUSE_SPRITESHEET } from "./config/config";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        // axios
        //     .post("/auth/register", {
        //         username: "Lennert4",
        //         password: "ABCabc123!",
        //     })
        //     .then((response) => console.log(response));

        axios
            .get("/api/buildables/data")
            .then((response) => {
                dispatch(LOAD_STATIC_HOUSE_DATA(response.data.houses));
                dispatch(LOAD_STATIC_COMPANY_DATA(response.data.companies));
                dispatch(LOAD_STATIC_DECORATION_DATA(response.data.decorations));
            })
            .catch((error) => console.error(error));

        axios
            .get("/api/buildables")
            .then((response) => {
                console.log(response.data);
                const placements = response.data.map((apiBuildable: any) => {
                    const placement: BuildablePlacement = {
                        buildableId: apiBuildable.id,
                        position: apiBuildable.location,
                        spritesheet: HOUSE_SPRITESHEET,
                        spritesheetLocation: apiBuildable.spritesheetLocation,
                    };

                    return placement;
                });

                dispatch(LOAD_BUILDINGS(placements));
            })
            .catch((error) => console.error(error));
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
