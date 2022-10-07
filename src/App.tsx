import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ModalContainer from "./components/Modals/ModalContainer";
import Toolbar from "./components/toolbar/Toolbar";
import World from "./components/world/map/World";
import { LOAD_STATIC_COMPANY_DATA, LOAD_STATIC_DECORATION_DATA, LOAD_STATIC_HOUSE_DATA } from "./redux/actions/StaticDataActions";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        axios
            .get("/buildables/data")
            .then((response) => {
                dispatch(LOAD_STATIC_HOUSE_DATA(response.data.houses));
                dispatch(LOAD_STATIC_COMPANY_DATA(response.data.companies));
                dispatch(LOAD_STATIC_DECORATION_DATA(response.data.decorations));
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
