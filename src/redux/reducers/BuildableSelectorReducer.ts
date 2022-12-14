import BuildableSelectorState from "../../types/interfaces/states/BuildableSelectorState";
import StaticBuildableData from "../../types/interfaces/static/StaticBuildableData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: BuildableSelectorState = { selectedBuildable: null };

/**
 * Reducer that contains the {@link BuildableSelectorState}
 * If a building is selected, this buildings data is saved in the state
 * If a building is deselected, the state is set to null
 */
const BuildableSelectorReducer = (state: BuildableSelectorState = initialState, action: { type: ActionTypeEnum; data: StaticBuildableData | undefined; id?: number }) => {
    switch (action.type) {
        case ActionTypeEnum.SELECT_BUILDING:
            return {
                ...state,
                selectedBuildable: action.data,
                id: action.id,
            };
        case ActionTypeEnum.DESELECT_BUILDING:
            return {
                ...state,
                selectedBuildable: null,
                id: null,
            };
        default:
            return state;
    }
};

export default BuildableSelectorReducer;
