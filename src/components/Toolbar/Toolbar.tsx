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
