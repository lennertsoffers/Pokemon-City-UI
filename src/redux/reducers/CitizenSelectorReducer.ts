import CitizenSelectorState from "../../types/interfaces/states/CitizenSelectorState";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: CitizenSelectorState = { citizenId: null };

const CitizenSelectorReducer = (state: CitizenSelectorState = initialState, action: { type: ActionTypeEnum; data: number }) => {
    switch (action.type) {
        case ActionTypeEnum.SELECT_CITIZEN:
            return {
                ...state,
                citizenId: action.data,
            };
        case ActionTypeEnum.UNSELECT_CITIZEN:
            return {
                ...state,
                citizenId: null,
            };
        default:
            return state;
    }
};

export default CitizenSelectorReducer;
