import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/AuthService";
import DataLoader from "../../api/DataLoader";
import { DESELECT_BUILDING } from "../../redux/actions/BuildableSelectorActions";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import Actions from "../actions/Actions";

const Toolbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [actionsVisible, setActionsVisible] = useState<boolean>(false);

    const handleBuildClick = () => {
        setActionsVisible(false);
        dispatch(OPEN_MODAL(ModalTypeEnum.BUILD_MODAL));
    };
    const handleActionsClick = () => {
        setActionsVisible(!actionsVisible);
        dispatch(DESELECT_BUILDING);
    };
    const handleCitizensClick = () => {
        setActionsVisible(false);
        dispatch(DESELECT_BUILDING);
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
    };
    const handleLogoutClick = () => {
        setActionsVisible(false);
        dispatch(DESELECT_BUILDING);
        AuthService.logout();
        navigate("/login");
    };

    return (
        <div className="toolbar">
            <div className="toolbar--inner">
                <div className="toolbar--inner__background">
                    <img src="./assets/ui/toolbar.png" alt="toolbar" />
                </div>
                <nav className="toolbar--inner__foreground">
                    <ul>
                        <li>
                            <div>
                                <button onClick={handleBuildClick}>BUILD</button>
                            </div>
                        </li>
                        <li>
                            <div>
                                <button onClick={handleActionsClick}>ACTIONS</button>
                            </div>
                        </li>
                        <li>
                            <div>
                                <button onClick={handleCitizensClick}>CITIZENS</button>
                            </div>
                        </li>
                        <li>
                            <div>
                                <button onClick={handleLogoutClick}>LOGOUT</button>
                            </div>
                        </li>
                    </ul>
                </nav>
            </div>
            {actionsVisible && <Actions />}
        </div>
    );
};

export default Toolbar;
