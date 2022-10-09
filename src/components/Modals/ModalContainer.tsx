import { useSelector } from "react-redux";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ActionsModal from "./toolbar/actions/ActionsModal";
import BuildModal from "./toolbar/building/BuildModal";
import CitizensModal from "./toolbar/CitizensModal";

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
