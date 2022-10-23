import StaticCompanyData from "../../types/interfaces/static/StaticCompanyData";
import StaticDataState from "../../types/interfaces/states/StaticDataState";
import StaticDecorationData from "../../types/interfaces/static/StaticDecorationData";
import StaticHouseData from "../../types/interfaces/static/StaticHouseData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: StaticDataState = { staticHouseData: [], staticCompanyData: [], staticDecorationData: [] };

/**
 * Reducer that contains the {@link StaticDataState}
 * The state consists of a list of data for houses, companies and decorations
 */
const StaticDataReducer = (state: StaticDataState = initialState, action: { type: ActionTypeEnum; data: Array<StaticHouseData> | Array<StaticCompanyData> | Array<StaticDecorationData> }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_STATIC_HOUSE_DATA:
            action.data.forEach((house) => (house.type = "HOUSE"));

            return {
                ...state,
                staticHouseData: action.data,
            };
        case ActionTypeEnum.LOAD_STATIC_COMPANY_DATA:
            action.data.forEach((company) => (company.type = "COMPANY"));

            return {
                ...state,
                staticCompanyData: action.data,
            };
        case ActionTypeEnum.LOAD_STATIC_DECORATION_DATA:
            action.data.forEach((decoration) => (decoration.type = "DECORATION"));

            return {
                ...state,
                staticDecorationData: action.data,
            };
        default:
            return state;
    }
};

export default StaticDataReducer;
