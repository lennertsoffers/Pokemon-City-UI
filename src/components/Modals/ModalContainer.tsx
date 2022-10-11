import { useSelector } from "react-redux";
import CombinedState from "../../types/interfaces/states/CombinedState";
import ActionsModal from "./actions/ActionsModal";
import BuildModal from "./building/BuildModal";
import CitizenAssignmentModal from "./citizenAssignments/CitizenAssignmentModal";
import CitizensModal from "./citizens/CitizensModal";
import BuildableDemolishModal from "./demolish/BuildableDemolishModal";
import StatisticsModal from "./statistics/StatisticsModal";
import ChangeCityNameModal from "./user/ChangeCityNameModal";

const ModalContainer = () => {
    const modalVisibilityMap = useSelector((state: CombinedState) => state.modalState.modalVisibilityMap);

    return (
        <div>
            {modalVisibilityMap.BUILD_MODAL && <BuildModal />}
            {modalVisibilityMap.ACTIONS_MODAL && <ActionsModal />}
            {modalVisibilityMap.CITIZENS_MODAL && <CitizensModal />}
            {modalVisibilityMap.CITIZEN_ASSIGNMENT_MODAL && <CitizenAssignmentModal />}
            {modalVisibilityMap.SELECT_CITIZEN_TO_DEMOLISH_MODAL && <BuildableDemolishModal />}
            {modalVisibilityMap.CHANGE_CITY_NAME_MODAL && <ChangeCityNameModal />}
            {modalVisibilityMap.STATISTICS_MODAL && <StatisticsModal />}
        </div>
    );
};

export default ModalContainer;
