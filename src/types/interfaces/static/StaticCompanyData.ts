import StaticBuildableData from "./StaticBuildableData";

interface StaticCompanyData extends StaticBuildableData {
    profitPerMinute: number;
    specialisationType: string;
    maxAssignedCitizens: number;
}

export default StaticCompanyData;
