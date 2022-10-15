import IncomeBuildingData from "./IncomeBuildingData";

interface CompanyData extends IncomeBuildingData {
    profitPerMinute: number;
    employeeMultiplier: number;
    assignedCitizens: number;
    maxAssignedCitizens: number;
}

export default CompanyData;
