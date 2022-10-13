import { useDispatch } from "react-redux";
import DataLoader from "../../api/DataLoader";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";

const Toolbar = () => {
    const dispatch = useDispatch();

    const handleBuildClick = () => dispatch(OPEN_MODAL(ModalTypeEnum.BUILD_MODAL));
    const handleActionsClick = () => dispatch(OPEN_MODAL(ModalTypeEnum.ACTIONS_MODAL));
    const handleCitizensClick = () => {
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
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
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default Toolbar;
