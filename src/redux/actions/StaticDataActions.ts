import StaticCompanyData from "../../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../types/interfaces/static/StaticHouseData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_STATIC_HOUSE_DATA = (staticHouseData: StaticHouseData) => ({ type: ActionTypeEnum.LOAD_STATIC_HOUSE_DATA, data: staticHouseData });
export const LOAD_STATIC_COMPANY_DATA = (staticCompanyData: StaticCompanyData) => ({ type: ActionTypeEnum.LOAD_STATIC_COMPANY_DATA, data: staticCompanyData });
export const LOAD_STATIC_DECORATION_DATA = (staticDecorationData: StaticDecorationData) => ({ type: ActionTypeEnum.LOAD_STATIC_DECORATION_DATA, data: staticDecorationData });
