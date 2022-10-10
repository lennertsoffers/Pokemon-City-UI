import { useEffect, useState } from "react";
import CityLoader from "../../../../api/CityLoader";
import CitizenAssignmentData from "../../../../types/interfaces/citizens/CitizenAssignmentData";
import Modal from "../../Modal";
import CitizenAssignmentCard from "./CitizenAssignmentCard";

const CitizenAssignmentModal = () => {
    const [citizenAssignments, setCitizenAssignments] = useState<Array<CitizenAssignmentData>>([]);

    useEffect(() => {
        CityLoader.getCompaniesWithEmployees().then((data) => setCitizenAssignments(data));
    }, []);

    return (
        <Modal title="Companies with Employees">
            <div className="citizenAssignmentModal--inner">
                {citizenAssignments.map((citizenAssignmentData: CitizenAssignmentData) => (
                    <CitizenAssignmentCard citizenAssignmentData={citizenAssignmentData} key={citizenAssignmentData.id} />
                ))}
            </div>
        </Modal>
    );
};

export default CitizenAssignmentModal;
