import StaticCompanyData from "../../types/interfaces/static/StaticCompanyData";
import StaticDecorationData from "../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../types/interfaces/static/StaticHouseData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_STATIC_HOUSE_DATA = (houses: Array<StaticHouseData>) => ({ type: ActionTypeEnum.LOAD_STATIC_HOUSE_DATA, data: houses });
export const LOAD_STATIC_COMPANY_DATA = (companies: Array<StaticCompanyData>) => ({ type: ActionTypeEnum.LOAD_STATIC_COMPANY_DATA, data: companies });
export const LOAD_STATIC_DECORATION_DATA = (decorations: Array<StaticDecorationData>) => ({ type: ActionTypeEnum.LOAD_STATIC_DECORATION_DATA, data: decorations });
