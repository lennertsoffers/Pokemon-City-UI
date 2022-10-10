import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import CityLoader from "../../../api/CityLoader";
import { DESELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import Modal from "../Modal";
import CitizenDataCard from "./CitizenDataCard";

const BuildableDemolishModal = () => {
    const [unassignedCitizens, setUnassignedCitizens] = useState<Array<CitizenData>>([]);
    const [selectedCitizens, setSelectedCitizens] = useState<Array<number>>([]);
    const selectedBuildableState = useSelector((state: CombinedState) => state.buildableSelectorState);
    const staticHouseDataList = useSelector((state: CombinedState) => state.staticDataState.staticHouseData);
    const selectedBuildableId = selectedBuildableState.id;
    const selectedBuildable = selectedBuildableState.selectedBuildable;
    const dispatch = useDispatch();

    useEffect(() => {
        CityLoader.getUnassignedCitizens().then((data) => setUnassignedCitizens(data));
    });

    if (!selectedBuildable || !selectedBuildableId) return <div>Not Found</div>;

    const staticHouseData: StaticHouseData | undefined = staticHouseDataList.find((houseData: StaticHouseData) => houseData.name === selectedBuildable.name);

    if (!staticHouseData) return <div>Not Found</div>;

    const amoutOfCitizensLeftToDelete = staticHouseData.numberOfCitizens - selectedCitizens.length;

    const buildTitle = () => {
        if (amoutOfCitizensLeftToDelete === 0) {
            return `Delete ${staticHouseData.name}`;
        } else if (amoutOfCitizensLeftToDelete > 0) {
            return `Select ${amoutOfCitizensLeftToDelete} More Citizen${amoutOfCitizensLeftToDelete > 1 ? "s" : ""} To Delete`;
        } else {
            return `Select ${Math.abs(amoutOfCitizensLeftToDelete)} Citizen${amoutOfCitizensLeftToDelete < -1 ? "s" : ""} Less To Delete`;
        }
    };

    const handleCitizenClick = (citizenId: number) => {
        if (selectedCitizens.includes(citizenId)) setSelectedCitizens(selectedCitizens.filter((id: number) => citizenId !== id));
        else setSelectedCitizens([...selectedCitizens, citizenId]);
    };

    const handleConfirmDemolishClick = () => {
        if (amoutOfCitizensLeftToDelete === 0) {
            BuildableService.demolishBuildable(selectedBuildableId, selectedCitizens);
        }

        // TODO - Handle wrong amount of citizens selected
        console.log(`Select ${amoutOfCitizensLeftToDelete} citizens more`);
    };

    const handleClose = () => {
        dispatch(DESELECT_BUILDING);
    };

    return (
        <Modal title={buildTitle()} onClose={handleClose}>
            <div className="buildableDemolishModal--inner">
                <div className="citizenDataCards">
                    {unassignedCitizens.map((citizenData: CitizenData) => (
                        <CitizenDataCard citizenData={citizenData} handleCitizenClick={handleCitizenClick} key={citizenData.id} />
                    ))}
                </div>
                <div className="confirmDemolishButton">
                    <button onClick={handleConfirmDemolishClick}>Demolish</button>
                </div>
            </div>
        </Modal>
    );
};

export default BuildableDemolishModal;
