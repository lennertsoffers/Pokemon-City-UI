import StaticCompanyData from "../../types/interfaces/static/StaticCompanyData";
import StaticDataState from "../../types/interfaces/states/StaticDataState";
import StaticDecorationData from "../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../types/interfaces/static/StaticHouseData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: StaticDataState = { staticHouseData: [], staticCompanyData: [], staticDecorationData: [] };

const StaticDataReducer = (state: StaticDataState = initialState, action: { type: ActionTypeEnum; data: StaticHouseData | StaticCompanyData | StaticDecorationData }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_STATIC_HOUSE_DATA:
            return {
                ...state,
                staticHouseData: action.data,
            };
        case ActionTypeEnum.LOAD_STATIC_COMPANY_DATA:
            return {
                ...state,
                staticCompanyData: action.data,
            };
        case ActionTypeEnum.LOAD_STATIC_DECORATION_DATA:
            return {
                ...state,
                staticDecorationData: action.data,
            };
        default:
            return state;
    }
};

export default StaticDataReducer;
