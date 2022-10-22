import { useSelector } from "react-redux";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import LoadingModal from "../LoadingModal";
import Modal from "../Modal";
import CitizenCard from "./CitizenCard";

/**
 * Modal container that list all the citizens living in the city
 * Clicking a citizen selects it and opens the {@link CitizenAssignmentModal}
 *
 * Extends - {@link Modal}
 */
const CitizensModal = () => {
    const amountOfCitizens = useSelector((state: CombinedState) => state.userState.userData?.citizens);
    const citizens = useSelector((state: CombinedState) => state.citizenState.citizens);

    // If the citizens are not loaded yet show the loading modal
    if (!amountOfCitizens || amountOfCitizens !== citizens.length) return <LoadingModal />;
    return (
        <Modal imageSource="./assets/ui/modal.png">
            <div className="citizensModal">
                <div className="citizensModal__citizenSelector">
                    {citizens.map((citizenData: CitizenData) => (
                        <CitizenCard citizenData={citizenData} key={citizenData.id} />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default CitizensModal;
