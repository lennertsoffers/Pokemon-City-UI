import BuildablePlacementState from "../../types/interfaces/states/BuildablePlacementState";
import buildableMoveData from "../../types/interfaces/world/BuildableMoveData";
import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: BuildablePlacementState = { buildablePlacements: [] };

const BuildablePlacementReducer = (
    state: BuildablePlacementState = initialState,
    action: { type: ActionTypeEnum; data: BuildablePlacement | Array<BuildablePlacement> | buildableMoveData | number }
) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_BUILDINGS:
            return {
                ...state,
                buildablePlacements: action.data,
            };
        case ActionTypeEnum.CREATE_BUILDING:
            return {
                ...state,
                buildablePlacements: [...state.buildablePlacements, action.data],
            };
        case ActionTypeEnum.MOVE_BUILDING:
            return {
                ...state,
                buildablePlacements: state.buildablePlacements.map((buildablePlacement: BuildablePlacement) => {
                    const moveData = action.data as buildableMoveData;
                    if (buildablePlacement.id === moveData.id) {
                        buildablePlacement.location = {
                            x: moveData.x,
                            y: moveData.y,
                        };
                    }

                    return buildablePlacement;
                }),
            };
        case ActionTypeEnum.DEMOLISH_BUILDING:
            return {
                ...state,
                buildablePlacements: state.buildablePlacements.filter((placement: BuildablePlacement) => placement.id !== action.data),
            };
        default:
            return state;
    }
};

export default BuildablePlacementReducer;
