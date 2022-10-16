import { useEffect, useState } from "react";
import CompanyService from "../../../api/CompanyService";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import Modal from "../Modal";
import CitizenAssignmentCard from "./CitizenAssignmentCard";

const CitizenAssignmentModal = () => {
    const [citizenAssignments, setCitizenAssignments] = useState<Array<CitizenAssignmentData>>([]);

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
                    {citizenAssignments.map((citizenAssignmentData: CitizenAssignmentData) => (
                        <CitizenAssignmentCard citizenAssignmentData={citizenAssignmentData} updateCitizenAssignments={updateCitizenAssignments} key={citizenAssignmentData.id} />
                    ))}
                </div>
            </div>
        </Modal>
    );
};

export default CitizenAssignmentModal;
