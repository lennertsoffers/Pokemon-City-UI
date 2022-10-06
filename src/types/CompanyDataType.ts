import BuildableDataType from "./BuildableDataType";

interface CompanyDataType extends BuildableDataType {
    profitPerMinute: number;
    specialisationType: string;
    maxAssignedCitizens: number;
}

export default CompanyDataType;
