import { useDispatch } from "react-redux";
import { SELECT_CITIZEN } from "../../../redux/actions/CitizenSelectorActions";
import { OPEN_MODAL } from "../../../redux/actions/ModalActions";
import ModalTypeEnum from "../../../types/enums/ModalTypeEnum";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import SpecialisationDataView from "./SpecialisationDataView";

const CitizenCard = ({ citizenData }: { citizenData: CitizenData }) => {
    const dispatch = useDispatch();

    const handleCitizenClick = () => {
        dispatch(SELECT_CITIZEN(citizenData.id));
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZEN_ASSIGNMENT_MODAL));
    };

    return (
        <div className="citizenCard" onClick={handleCitizenClick}>
            <div>{citizenData.name}</div>
            <div>Level Speed: {citizenData.levelSpeed}</div>
            <div>Since: {citizenData.assignedSince}</div>
            <SpecialisationDataView specialisationData={citizenData.specialisationData} maxSpecialisationData={citizenData.maxSpecialisationData} />
        </div>
    );
};

export default CitizenCard;
