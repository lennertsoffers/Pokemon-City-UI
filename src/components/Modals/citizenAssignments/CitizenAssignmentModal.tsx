import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import CitizenService from "../../../api/CitizenService";
import CompanyService from "../../../api/CompanyService";
import AssignedCitizenData from "../../../types/interfaces/citizens/AssignedCitizenData";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Modal from "../Modal";
import CitizenAssignmentCard from "./CitizenAssignmentCard";

const CitizenAssignmentModal = () => {
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);
    const [citizenAssignments, setCitizenAssignments] = useState<Array<CitizenAssignmentData>>([]);

    const handleUnassingClick = () => {
        if (!citizenId) return;
        if (!citizenAssignments.some((assignment: CitizenAssignmentData) => assignment.employees.some((assignedCitizen: AssignedCitizenData) => assignedCitizen.id === citizenId))) return;
        CitizenService.unassignCitizen(citizenId, updateCitizenAssignments);
    };

    const updateCitizenAssignments = () => {
        CompanyService.getCompaniesWithEmployees().then((data) => setCitizenAssignments(data));
    };

    useEffect(() => {
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
