import { useSelector } from "react-redux";
import CitizenService from "../../../api/CitizenService";
import CompanyService from "../../../api/CompanyService";
import AssignedCitizenData from "../../../types/interfaces/citizens/AssignedCitizenData";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StringUtils from "../../../utils/StringUtils";
import CitizenCard from "../citizens/CitizenCard";

const CitizenAssignmentCard = ({ citizenAssignmentData, updateCitizenAssignments }: { citizenAssignmentData: CitizenAssignmentData; updateCitizenAssignments: Function }) => {
    const amountOfEmployees = citizenAssignmentData.employees.length;
    const spacesAvailable = citizenAssignmentData.maxAssignedCitizens - amountOfEmployees;
    const specialisationType = citizenAssignmentData.specialisationType.charAt(0) + citizenAssignmentData.specialisationType.substring(1).toLowerCase();
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);

    const handleClick = () => {
        if (spacesAvailable <= 0) return;
        if (citizenId) CitizenService.assignCitizen(citizenId, citizenAssignmentData.id, updateCitizenAssignments);

        CompanyService.getCompaniesWithEmployees();
    };

    return (
        <div className="citizenAssignmentDataWrapper">
            <div className="companyData" onClick={handleClick}>
                <div className="companyData__image">
                    <img src={"./assets/images/" + StringUtils.toConstantName(citizenAssignmentData.name) + ".png"} alt="buildable" />
                </div>
                <div>
                    <div className="companyData__name">{citizenAssignmentData.name}</div>
                    <div className="companyData__topic">
                        <div>Specialisation:</div>
                        <div>{specialisationType}</div>
                    </div>
                    <div className="companyData__topic">
                        <div>Employees:</div>
                        <div>
                            {amountOfEmployees}/{citizenAssignmentData.maxAssignedCitizens}
                        </div>
                    </div>
                </div>
            </div>
            <div className="employeeData">
                <div className="assignedCitizens">
                    {citizenAssignmentData.employees.map((assignedCitizenData: AssignedCitizenData) => (
                        <CitizenCard selected={citizenId === assignedCitizenData.id} citizenData={assignedCitizenData} key={assignedCitizenData.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitizenAssignmentCard;
