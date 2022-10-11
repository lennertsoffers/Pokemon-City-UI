import AssignedCitizenData from "../../../types/interfaces/citizens/AssignedCitizenData";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import StringUtils from "../../../utils/StringUtils";
import CitizenCard from "../citizens/CitizenCard";
import EmptyEmployeeSpace from "./EmptyEmployeeSpace";

const CitizenAssignmentCard = ({ citizenAssignmentData, updateCitizenAssignments }: { citizenAssignmentData: CitizenAssignmentData; updateCitizenAssignments: Function }) => {
    const amountOfEmployees = citizenAssignmentData.employees.length;
    const spacesAvailable = citizenAssignmentData.maxAssignedCitizens - amountOfEmployees;

    return (
        <div className="citizenAssignmentDataWrapper">
            <div className="companyData">
                <div>
                    <div>
                        <img src={"./assets/images/" + StringUtils.toConstantName(citizenAssignmentData.name) + ".png"} alt="buildable" />
                    </div>
                </div>
                <div>
                    <div>{citizenAssignmentData.name}</div>
                    <div>Specialisation: {citizenAssignmentData.specialisationType}</div>
                    <div>
                        Employees: {amountOfEmployees}/{citizenAssignmentData.maxAssignedCitizens}
                    </div>
                </div>
            </div>
            <div className="employeeData">
                {spacesAvailable > 0 && <EmptyEmployeeSpace companyId={citizenAssignmentData.id} updateCitizenAssignments={updateCitizenAssignments} />}
                <div className="assignedCitizens">
                    {citizenAssignmentData.employees.map((assignedCitizenData: AssignedCitizenData) => (
                        <CitizenCard citizenData={assignedCitizenData} key={assignedCitizenData.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitizenAssignmentCard;
