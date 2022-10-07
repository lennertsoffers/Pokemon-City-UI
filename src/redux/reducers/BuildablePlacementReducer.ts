import BuildablePlacementState from "../../types/interfaces/states/BuildablePlacementState";
import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: BuildablePlacementState = { buildablePlacements: [] };

const BuildablePlacementReducer = (state = initialState, action: { type: ActionTypeEnum; data: BuildablePlacement }) => {
    switch (action.type) {
        case ActionTypeEnum.CREATE_BUILDING:
            const data = action.data as BuildablePlacement;

            return {
                ...state,
                buildablePlacements: [...state.buildablePlacements, data],
            };
        default:
            return state;
    }
};

export default BuildablePlacementReducer;
