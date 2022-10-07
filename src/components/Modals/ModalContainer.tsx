import { useSelector } from "react-redux";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ActionsModal from "./Toolbar/ActionsModal";
import BuildModal from "./Toolbar/BuildModal";
import CitizensModal from "./Toolbar/CitizensModal";

const ModalContainer = () => {
    const modalVisibilityMap = useSelector((state: CombinedState) => state.modalState.modalVisibilityMap);

    return (
        <div>
            {modalVisibilityMap.BUILD_MODAL && <BuildModal />}
            {modalVisibilityMap.ACTIONS_MODAL && <ActionsModal />}
            {modalVisibilityMap.CITIZENS_MODAL && <CitizensModal />}
        </div>
    );
};

export default ModalContainer;
