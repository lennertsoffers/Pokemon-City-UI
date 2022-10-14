import IncomeBuildingData from "./IncomeBuildingData";

interface CompanyData extends IncomeBuildingData {
    profitPerMinute: number;
    employeeMultiplier: number;
    maxAssignedCitizens: number;
}

export default CompanyData;
