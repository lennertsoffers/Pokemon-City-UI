import BuildablePlacementState from "../../types/interfaces/states/BuildablePlacementState";
import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: BuildablePlacementState = { buildablePlacements: [] };

const BuildablePlacementReducer = (state: BuildablePlacementState = initialState, action: { type: ActionTypeEnum; data: BuildablePlacement | Array<BuildablePlacement> }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_BUILDINGS:
            console.log(action.data);

            return {
                ...state,
                buildablePlacements: action.data,
            };
        case ActionTypeEnum.CREATE_BUILDING:
            return {
                ...state,
                buildablePlacements: [...state.buildablePlacements, action.data],
            };
        default:
            return state;
    }
};

export default BuildablePlacementReducer;
