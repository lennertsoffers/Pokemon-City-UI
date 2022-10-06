import BuildableDataType from "./BuildableDataType";

interface HouseDataType extends BuildableDataType {
    numberOfCitizens: number;
    maxRent: number;
    rentPerMinute: number;
}

export default HouseDataType;
