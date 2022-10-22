import { useEffect, useState } from "react";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import SpecialisationDataView from "../citizens/SpecialisationDataView";

/** Component that shows the data of a citizen and if its marked for deletion */
const CitizenDataCard = ({ citizenData, handleCitizenClick, preSelected }: { citizenData: CitizenData; handleCitizenClick: Function; preSelected: boolean }) => {
    // Indicates if the citizens is marked for deletion or not
    const [selected, setSelected] = useState<boolean>(false);

    /**
     * Set the selected property both on this cards state aswell as the parent {@link BuildableDemolishModal}
     */
    const handleCitizenDataClick = () => {
        setSelected(!selected);
        handleCitizenClick(citizenData.id);
    };

    // Preselected = Selected by clicking 'select worst' in the BuildableDemolishModal
    // If preselected is true, this citizen is selected by the parent component
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
