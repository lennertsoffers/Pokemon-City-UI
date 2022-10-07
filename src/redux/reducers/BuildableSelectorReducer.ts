import BuildableSelectorState from "../../types/interfaces/states/BuildableSelectorState";
import StaticBuildableData from "../../types/interfaces/static/StaticBuildableData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: BuildableSelectorState = { selectedBuildable: null };

const BuildableSelectorReducer = (state: BuildableSelectorState = initialState, action: { type: ActionTypeEnum; data: StaticBuildableData | undefined }) => {
    switch (action.type) {
        case ActionTypeEnum.SELECT_BUILDING:
            return {
                ...state,
                selectedBuildable: action.data,
            };
        case ActionTypeEnum.DESELECT_BUILDING:
            return {
                ...state,
                selectedBuildable: null,
            };
        default:
            return state;
    }
};

export default BuildableSelectorReducer;
