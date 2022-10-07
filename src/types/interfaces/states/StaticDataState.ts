import StaticCompanyData from "../static/StaticCompanyData";
import StaticDecorationData from "../static/StaticDecorationData";
import StaticHouseData from "../static/StaticHouseData";

interface StaticDataState {
    staticHouseData: Array<StaticHouseData>;
    staticCompanyData: Array<StaticCompanyData>;
    staticDecorationData: Array<StaticDecorationData>;
}

export default StaticDataState;
