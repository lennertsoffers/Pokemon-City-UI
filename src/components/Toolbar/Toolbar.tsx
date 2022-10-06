import axios from "axios";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { LOAD_BUILDING_DATA } from "../../redux/actions/BuildingDataActions";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";

const Toolbar = () => {
    const dispatch = useDispatch();

    const handleBuildClick = () => dispatch(OPEN_MODAL(ModalTypeEnum.BUILD_MODAL));
    const handleActionsClick = () => dispatch(OPEN_MODAL(ModalTypeEnum.ACTIONS_MODAL));
    const handleCitizensClick = () => dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));

    useEffect(() => {
        axios
            .get("/buildables/data")
            .then((response) => dispatch(LOAD_BUILDING_DATA(response.data)))
            .catch((error) => console.error(error));
    });

    return (
        <div className="toolbar">
            <div className="toolbar--inner">
                <nav>
                    <ul>
                        <li>
                            <button onClick={handleBuildClick}>BUILD</button>
                        </li>
                        <li>
                            <button onClick={handleActionsClick}>ACTIONS</button>
                        </li>
                        <li>
                            <button onClick={handleCitizensClick}>CITIZENS</button>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Toolbar;
