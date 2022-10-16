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
                backgroundColor: `${selected ? "rgba(200, 100, 100, 0.7)" : "rgba(100, 100, 100, 0.3)"}`,
            }}
        >
            <div className="citizenCard__name">{citizenData.name}</div>
            <SpecialisationDataView specialisationData={citizenData.specialisationData} maxSpecialisationData={citizenData.maxSpecialisationData} />
        </div>
    );
};

export default CitizenDataCard;
