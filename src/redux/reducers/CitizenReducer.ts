import CitizenData from "../../types/interfaces/citizens/CitizenData";
import CitizenState from "../../types/interfaces/states/CitizenState";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: CitizenState = { citizens: [] };

/**
 * Reducer that containse the {@link CitizenState}
 * It holds a list of {@link CitizenData}
 */
const CitizenReducer = (state: CitizenState = initialState, action: { type: ActionTypeEnum; data: Array<CitizenData> }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_CITIZENS:
            return {
                ...state,
                citizens: action.data,
            };
        default:
            return state;
    }
};

export default CitizenReducer;
