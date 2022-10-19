import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import AuthService from "../../api/AuthService";
import DataLoader from "../../api/DataLoader";
import { DESELECT_BUILDING } from "../../redux/actions/BuildableSelectorActions";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import { UNSELECT_ACTION } from "../../redux/actions/SelectedActionActions";
import ActionEnum from "../../types/enums/ActionEnum";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import CombinedState from "../../types/interfaces/states/CombinedState";
import Actions from "../actions/Actions";

const Toolbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const [actionsVisible, setActionsVisible] = useState<boolean>(false);

    const handleBuildClick = () => {
        setActionsVisible(false);

        if (action === ActionEnum.BUILD) {
            dispatch(DESELECT_BUILDING);
            dispatch(UNSELECT_ACTION);
        } else {
            dispatch(OPEN_MODAL(ModalTypeEnum.BUILD_MODAL));
        }
    };
    const handleActionsClick = () => {
        dispatch(UNSELECT_ACTION);
        setActionsVisible(!actionsVisible);
        dispatch(DESELECT_BUILDING);
    };
    const handleCitizensClick = () => {
        reset();
        dispatch(DESELECT_BUILDING);
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
    };
    const handleLogoutClick = () => {
        reset();
        AuthService.logout();
        navigate("/login");
    };

    const reset = () => {
        setActionsVisible(false);
        dispatch(UNSELECT_ACTION);
    };

    useEffect(() => {
        if (!actionsVisible) dispatch(UNSELECT_ACTION);
    }, [actionsVisible, dispatch]);

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
