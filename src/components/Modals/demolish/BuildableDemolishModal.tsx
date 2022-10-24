import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import CitizenService from "../../../api/CitizenService";
import DataLoader from "../../../api/DataLoader";
import ErrorHandler from "../../../error/ErrorHandler";
import { DEMOLISH_BUILDING } from "../../../redux/actions/BuildableDataActions";
import { DESELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import CitizenUtils from "../../../utils/CitizenUtils";
import LoadingModal from "../LoadingModal";
import Modal from "../Modal";
import CitizenDataCard from "./CitizenDataCard";

/**
 * Modal container that list all the citizens living in the city but that are not assigned to a company
 * With this modal the user can select which citizens to delete when demolishing a house
 * In this way he/she can keep the citizens with the best specialisation data
 *
 * Extends - {@link Modal}
 */
const BuildableDemolishModal = () => {
    const [loading, setLoading] = useState<boolean>(true);
    const [unassignedCitizens, setUnassignedCitizens] = useState<Array<CitizenData>>([]);
    // List of citizenIds that are selected to delete
    const [selectedCitizens, setSelectedCitizens] = useState<Array<number>>([]);
    const selectedBuildableState = useSelector((state: CombinedState) => state.buildableSelectorState);
    const staticHouseDataList = useSelector((state: CombinedState) => state.staticDataState.staticHouseData);
    const selectedBuildableId = selectedBuildableState.id;
    const selectedBuildable = selectedBuildableState.selectedBuildable;
    const dispatch = useDispatch();

    const staticHouseData: StaticHouseData | undefined = staticHouseDataList.find((houseData: StaticHouseData) => houseData.name === selectedBuildable?.name);

    /**
     * Loads all citizen data and sorts on total amount of maxSpecialisationData
     * In this way the worst citizens are at the top of the modal
     */
    const loadCitizens = useCallback(async () => {
        const unassignedCitizens = await CitizenService.getUnassignedCitizens();
        unassignedCitizens.sort((a: CitizenData, b: CitizenData) => CitizenUtils.totalSpecialisationData(a.maxSpecialisationData) - CitizenUtils.totalSpecialisationData(b.maxSpecialisationData));
        setUnassignedCitizens(unassignedCitizens);

        setLoading(false);
    }, []);

    useEffect(() => {
        loadCitizens();
    }, [loadCitizens]);

    // Return the load modal if there is data that is not loaded yet
    if (!selectedBuildable || !selectedBuildableId || !staticHouseData || loading) return <LoadingModal />;

    // Calculates how many citizens the user has to select until he/she has selected the right amount of citizens to demolish the house
    const amoutOfCitizensLeftToDelete = staticHouseData.numberOfCitizens - selectedCitizens.length;

    /**
     * Creates the title that shows how many citizens more or less the user has to select
     */
    const buildTitle = () => {
        // If the user has selected the right amount of citizens
        // 'Delete {name of house}' is displayed
        if (amoutOfCitizensLeftToDelete === 0) return `Delete ${staticHouseData.name}`;
        if (amoutOfCitizensLeftToDelete > 0) return `Select ${amoutOfCitizensLeftToDelete} More Citizen${amoutOfCitizensLeftToDelete > 1 ? "s" : ""} To Delete`;
        return `Select ${Math.abs(amoutOfCitizensLeftToDelete)} Citizen${amoutOfCitizensLeftToDelete < -1 ? "s" : ""} Less To Delete`;
    };

    /**
     * Handles the click on a citizenDataCard child
     * If its already selected, this citizen gets deselected
     * It gets selected otherwise
     * @param citizenId The id of the citizen to select/deselect
     */
    const handleCitizenClick = (citizenId: number) => {
        if (selectedCitizens.includes(citizenId)) setSelectedCitizens(selectedCitizens.filter((id: number) => citizenId !== id));
        else setSelectedCitizens([...selectedCitizens, citizenId]);
    };

    /**
     * Triggered when the user clicks on the confirm demolish button
     * Checks if the right amount of citizens is selected for deletion
     * If this is the case, the house and citizens will be deleted
     */
    const handleConfirmDemolishClick = () => {
        if (amoutOfCitizensLeftToDelete === 0) {
            BuildableService.demolishBuildable(
                selectedBuildableId,
                () => {
                    // In case of success
                    // The building is also removed form the buildable list (no need to fetch the complete list of buildables from the api again)
                    dispatch(DEMOLISH_BUILDING(selectedBuildableId));
                    // The userdata is updated
                    DataLoader.loadUserData();
                },
                () => {
                    // In all cases
                    // The buildable is deselected and the modal is closed
                    dispatch(DESELECT_BUILDING);
                    dispatch(CLOSE_MODAL);
                },
                selectedCitizens
            );
        } else {
            // Use the errorhandler to show how many more/less citizens need to be selected to demolish the buildable
            ErrorHandler.showError(buildTitle());
        }
    };

    /**
     * Automatically selects the right amount of citizens for removal
     * It chooses the worst citizens (worst = lowest total of specialisation data)
     */
    const handleSelectWorstClick = () => {
        setSelectedCitizens([]);

        const amountToSelect = staticHouseData.numberOfCitizens;
        setSelectedCitizens(unassignedCitizens.map((citizen) => citizen.id).slice(0, amountToSelect));
    };

    /**
     * Deselects building on clonsing the modal
     */
    const handleClose = () => {
        dispatch(DESELECT_BUILDING);
    };

    return (
        <Modal imageSource="./assets/ui/modal.png" onClose={handleClose}>
            <div className="buildableDemolishModal">
                <div className="buildableDemolishModal__title">{buildTitle()}</div>
                <div className="buildableDemolishModal__citizenDataCards">
                    {unassignedCitizens.map((citizenData: CitizenData) => (
                        <CitizenDataCard preSelected={selectedCitizens.includes(citizenData.id)} citizenData={citizenData} handleCitizenClick={handleCitizenClick} key={citizenData.id} />
                    ))}
                </div>
                <div className="buildableDemolishModal__buttons">
                    <button onClick={handleConfirmDemolishClick}>Demolish</button>
                    <button onClick={handleSelectWorstClick}>Select Worst</button>
                </div>
            </div>
        </Modal>
    );
};

export default BuildableDemolishModal;
