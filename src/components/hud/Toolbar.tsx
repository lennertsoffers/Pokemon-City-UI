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

/**
 * Component that displays the toolbar actions
 */
const Toolbar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const [actionsVisible, setActionsVisible] = useState<boolean>(false);

    /**
     * Stops the building action if the user was already building
     * Opens the building modal if the user wasn't building yet
     */
    const handleBuildClick = () => {
        setActionsVisible(false);

        if (action === ActionEnum.BUILD) {
            dispatch(DESELECT_BUILDING);
            dispatch(UNSELECT_ACTION);
        } else {
            dispatch(OPEN_MODAL(ModalTypeEnum.BUILD_MODAL));
        }
    };

    /**
     * Opens the actions menu if it wasn't visible yet
     * Closes it and deselects the current action if it was already open
     */
    const handleActionsClick = () => {
        dispatch(UNSELECT_ACTION);
        setActionsVisible(!actionsVisible);
        dispatch(DESELECT_BUILDING);
    };

    /**
     * Opens the citizens modal and loads the newest data of the citizens
     */
    const handleCitizensClick = () => {
        reset();
        dispatch(DESELECT_BUILDING);
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
    };

    /**
     * Logs the player out and opens the login page
     */
    const handleLogoutClick = () => {
        reset();
        AuthService.logout();
        navigate("/login");
    };

    /**
     * Closes the actions menu and deselects the currently selected action
     */
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
