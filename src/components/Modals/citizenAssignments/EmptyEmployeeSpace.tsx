import axios from "axios";
import { useSelector } from "react-redux";
import CompanyService from "../../../api/CompanyService";
import CombinedState from "../../../types/interfaces/states/CombinedState";

const EmptyEmployeeSpace = ({ companyId, updateCitizenAssignments }: { companyId: number; updateCitizenAssignments: any }) => {
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);

    const handleClick = () => {
        axios
            .put("/api/citizens/assign", {
                citizenId: citizenId,
                companyId: companyId,
            })
            .then(() => {
                console.log("Citizen assigned");
                updateCitizenAssignments();
            })
            .catch((error) => {
                console.log(error);
            });

        CompanyService.getCompaniesWithEmployees();
    };

    return <div onClick={handleClick} className="emptyEmployeeSpace"></div>;
};

export default EmptyEmployeeSpace;
