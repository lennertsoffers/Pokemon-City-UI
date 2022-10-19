import { useDispatch, useSelector } from "react-redux";
import { SELECT_CITIZEN } from "../../../redux/actions/CitizenSelectorActions";
import { OPEN_MODAL } from "../../../redux/actions/ModalActions";
import ModalTypeEnum from "../../../types/enums/ModalTypeEnum";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildableData from "../../../types/interfaces/world/BuildableData";
import SpecialisationDataView from "./SpecialisationDataView";

const CitizenCard = ({ citizenData, selected }: { citizenData: CitizenData; selected?: boolean }) => {
    const dispatch = useDispatch();
    const amountOfCompanies = useSelector(
        (state: CombinedState) => state.buildableDataState.buildableDataList.filter((buildableData: BuildableData) => buildableData.buildableTypeEnum === "COMPANY").length
    );

    const handleCitizenClick = () => {
        if (amountOfCompanies <= 0) return;

        dispatch(SELECT_CITIZEN(citizenData.id));
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZEN_ASSIGNMENT_MODAL));
    };

    return (
        <div className={`citizenCard ${selected ? "citizenCard--selected" : ""}`} onClick={handleCitizenClick}>
            <div className="citizenCard__name">{citizenData.name}</div>
            <div className="citizenCard__speed">Level Speed: {citizenData.levelSpeed}</div>
            <SpecialisationDataView specialisationData={citizenData.specialisationData} maxSpecialisationData={citizenData.maxSpecialisationData} />
        </div>
    );
};

export default CitizenCard;
