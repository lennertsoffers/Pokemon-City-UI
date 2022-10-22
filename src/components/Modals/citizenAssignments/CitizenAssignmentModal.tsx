import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CitizenService from "../../../api/CitizenService";
import CompanyService from "../../../api/CompanyService";
import AssignedCitizenData from "../../../types/interfaces/citizens/AssignedCitizenData";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Modal from "../Modal";
import CitizenAssignmentCard from "./CitizenAssignmentCard";

/**
 * Modal container for citizen assignments that list all companies together with the citizens that are assigned to these companies
 * Gives the user the option to assign the selected citizen to a company or un-assign a citizen from a company by clicking the un-assign button
 *
 * Extends - {@link Modal}
 */
const CitizenAssignmentModal = () => {
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);
    const [citizenAssignments, setCitizenAssignments] = useState<Array<CitizenAssignmentData>>([]);

    /**
     * Un-assigns the citizen that is selected
     */
    const handleUnassingClick = () => {
        // Only send the un-assign request to the server if there is a citizen selected and the selecte citizen is indeed assigned to a company
        if (!citizenId) return;
        if (!citizenAssignments.some((assignment: CitizenAssignmentData) => assignment.employees.some((assignedCitizen: AssignedCitizenData) => assignedCitizen.id === citizenId))) return;

        CitizenService.unassignCitizen(citizenId, updateCitizenAssignments);
    };

    /**
     * Get the latest assignment data from the Api
     */
    const updateCitizenAssignments = () => {
        CompanyService.getCompaniesWithEmployees().then((data) => setCitizenAssignments(data));
    };

    useEffect(() => {
        // Every time the modal gets opened, load in the newest data
        updateCitizenAssignments();
    }, []);

    return (
        <Modal imageSource="./assets/ui/modal.png">
            <div className="citizenAssignmentModal">
                <div className="citizenAssignmentModal--inner">
                    <div>
                        {citizenAssignments.map((citizenAssignmentData: CitizenAssignmentData) => (
                            <CitizenAssignmentCard citizenAssignmentData={citizenAssignmentData} updateCitizenAssignments={updateCitizenAssignments} key={citizenAssignmentData.id} />
                        ))}
                    </div>
                    <div onClick={handleUnassingClick} className="citizenAssignmentModal__unassign">
                        <img src="./assets/ui/demolish.png" alt="delete" />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default CitizenAssignmentModal;
