import { useSelector } from "react-redux";
import CitizenService from "../../../api/CitizenService";
import CompanyService from "../../../api/CompanyService";
import CombinedState from "../../../types/interfaces/states/CombinedState";

const EmptyEmployeeSpace = ({ companyId, updateCitizenAssignments }: { companyId: number; updateCitizenAssignments: Function }) => {
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);

    const handleClick = () => {
        if (citizenId) CitizenService.assignCitizen(citizenId, companyId, updateCitizenAssignments);

        CompanyService.getCompaniesWithEmployees();
    };

    return <div onClick={handleClick} className="emptyEmployeeSpace"></div>;
};

export default EmptyEmployeeSpace;
