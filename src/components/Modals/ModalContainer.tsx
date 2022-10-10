import { useSelector } from "react-redux";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ActionsModal from "./toolbar/actions/ActionsModal";
import BuildModal from "./toolbar/building/BuildModal";
import CitizenAssignmentModal from "./toolbar/citizenAssignments/CitizenAssignmentModal";
import CitizensModal from "./toolbar/citizens/CitizensModal";

const ModalContainer = () => {
    const modalVisibilityMap = useSelector((state: CombinedState) => state.modalState.modalVisibilityMap);

    return (
        <div>
            {modalVisibilityMap.BUILD_MODAL && <BuildModal />}
            {modalVisibilityMap.ACTIONS_MODAL && <ActionsModal />}
            {modalVisibilityMap.CITIZENS_MODAL && <CitizensModal />}
            {modalVisibilityMap.CITIZEN_ASSIGNMENT_MODAL && <CitizenAssignmentModal />}
        </div>
    );
};

export default ModalContainer;
