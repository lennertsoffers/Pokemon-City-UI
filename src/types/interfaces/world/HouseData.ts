import IncomeBuildingData from "./IncomeBuildingData";

interface HouseData extends IncomeBuildingData {
    numberOfCitizens: number;
    maxRent: number;
    rentPerMinute: number;
}

export default HouseData;
