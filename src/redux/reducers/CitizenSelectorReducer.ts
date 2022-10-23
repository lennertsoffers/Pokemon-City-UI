import CitizenSelectorState from "../../types/interfaces/states/CitizenSelectorState";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: CitizenSelectorState = { citizenId: null };

/**
 * Reducer that contains the {@link CitizenSelectorState}
 * If a citizen is selected, it holds this citizen's id
 * If the citizen is deselected, the state is set to null
 */
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
