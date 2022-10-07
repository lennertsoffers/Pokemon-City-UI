import StaticBuildableData from "./StaticBuildableData";

interface StaticHouseData extends StaticBuildableData {
    numberOfCitizens: number;
    maxRent: number;
    rentPerMinute: number;
}

export default StaticHouseData;
