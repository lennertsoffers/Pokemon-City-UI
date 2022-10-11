import { useEffect, useState } from "react";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import SpecialisationDataView from "../citizens/SpecialisationDataView";

const CitizenDataCard = ({ citizenData, handleCitizenClick, preSelected }: { citizenData: CitizenData; handleCitizenClick: Function; preSelected: boolean }) => {
    const [selected, setSelected] = useState<boolean>(false);

    const handleCitizenDataClick = () => {
        setSelected(!selected);
        handleCitizenClick(citizenData.id);
    };

    useEffect(() => setSelected(preSelected), [preSelected]);

    return (
        <div
            className="citizenCard"
            onClick={handleCitizenDataClick}
            style={{
                backgroundColor: `${selected ? "rgba(50, 200, 50, 0.7)" : "#fff"}`,
            }}
        >
            <div>{citizenData.name}</div>
            <div>{citizenData.levelSpeed}</div>
            <SpecialisationDataView specialisationData={citizenData.specialisationData} maxSpecialisationData={citizenData.maxSpecialisationData} />
        </div>
    );
};

export default CitizenDataCard;
