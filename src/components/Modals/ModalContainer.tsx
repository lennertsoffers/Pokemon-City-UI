import { useSelector } from "react-redux";
import CombinedState from "../../types/interfaces/states/CombinedState";
import BuildModal from "./building/BuildModal";
import CitizenAssignmentModal from "./citizenAssignments/CitizenAssignmentModal";
import CitizensModal from "./citizens/CitizensModal";
import BuildableDemolishModal from "./demolish/BuildableDemolishModal";
import StatisticsModal from "./statistics/StatisticsModal";

/**
 * Component that wraps all modals
 * Only one modal can be displayed at a time
 * When a new modal is selected by the {@link ActionTypeEnum.OPEN_MODAL} action, all modals are closed and the new modal is shown by setting it in the {@link ModalState}
 * When {@link ActionTypeEnum.CLOSE_MODAL} is called, all modals are closed by setting the {@link ModalState} to null
 *
 * @returns The modal selected in the {@link ModalState}
 */
const ModalContainer = () => {
    const modalVisibilityMap = useSelector((state: CombinedState) => state.modalState.modalVisibilityMap);

    return (
        <div>
            {modalVisibilityMap.BUILD_MODAL && <BuildModal />}
            {modalVisibilityMap.CITIZENS_MODAL && <CitizensModal />}
            {modalVisibilityMap.CITIZEN_ASSIGNMENT_MODAL && <CitizenAssignmentModal />}
            {modalVisibilityMap.SELECT_CITIZEN_TO_DEMOLISH_MODAL && <BuildableDemolishModal />}
            {modalVisibilityMap.STATISTICS_MODAL && <StatisticsModal />}
        </div>
    );
};

export default ModalContainer;
