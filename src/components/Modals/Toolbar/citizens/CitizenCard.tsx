import CitizenData from "../../../../types/interfaces/citizens/CitizenData";
import SpecialisationDataView from "./SpecialisationDataView";

const CitizenCard = ({ citizenData }: { citizenData: CitizenData }) => {
    return (
        <div className="citizenCard">
            <div>{citizenData.name}</div>
            <div>Level Speed: {citizenData.levelSpeed}</div>
            <div>Assigned Since: {citizenData.assignedSince}</div>
            <SpecialisationDataView specialisationData={citizenData.specialisationData} maxSpecialisationData={citizenData.maxSpecialisationData} />
        </div>
    );
};

export default CitizenCard;
