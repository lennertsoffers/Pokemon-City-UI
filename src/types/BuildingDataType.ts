import CompanyDataType from "./CompanyDataType";
import DecorationDataType from "./DecorationDataType";
import HouseDataType from "./HouseDataType";

interface BuildingDataType {
    houses: Array<HouseDataType>;
    companies: Array<CompanyDataType>;
    decorations: Array<DecorationDataType>;
}

export default BuildingDataType;
