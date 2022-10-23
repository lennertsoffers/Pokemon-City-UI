import ActionEnum from "../../types/enums/ActionEnum";
import SelectedActionState from "../../types/interfaces/states/SelectedActionState";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: SelectedActionState = { selectedAction: ActionEnum.NONE };

/**
 * Reducer that contains the {@link SelectedActionState}
 * - SELECT_ACTION: Sets the selected action to the provided action
 * - UNSELECT_ACTION: Sets the selected action to {@link ActionEnum.NONE}
 */
const SelectedActionReducer = (state: SelectedActionState = initialState, action: { type: ActionTypeEnum; data: ActionEnum }) => {
    switch (action.type) {
        case ActionTypeEnum.SELECT_ACTION:
            return {
                ...state,
                selectedAction: action.data,
            };
        case ActionTypeEnum.UNSELECT_ACTION:
            return {
                ...state,
                selectedAction: ActionEnum.NONE,
            };
        default:
            return state;
    }
};

export default SelectedActionReducer;
