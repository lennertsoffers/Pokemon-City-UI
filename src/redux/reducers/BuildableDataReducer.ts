import BuildableDataState from "../../types/interfaces/states/BuildableDataState";
import BuildableData from "../../types/interfaces/world/BuildableData";
import buildableMoveData from "../../types/interfaces/world/BuildableMoveData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: BuildableDataState = { buildableDataList: [] };

/**
 * Reducer that contains the {@link BuildableDataState}
 * It holds the list of buildables in the city
 * - LOAD_BUILDINGS: Saves the buildings provided in the state
 * - UPDATE_BUILDING: Updates one building in the state
 * - CREATE_BUILDING: Adds a new building to the state
 * - MOVE_BUILDING: Updates the of a single building in the state
 * - DEMOLISH_BUILDING: Removes the building from the state
 */
const BuildableDataReducer = (state: BuildableDataState = initialState, action: { type: ActionTypeEnum; data: BuildableData | Array<BuildableData> | buildableMoveData | number }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_BUILDINGS:
            return {
                ...state,
                buildableDataList: action.data,
            };
        case ActionTypeEnum.UPDATE_BUILDING:
            const updatedBuildableData = action.data as BuildableData;

            return {
                ...state,
                buildableDataList: state.buildableDataList.map((buildableData: BuildableData) => {
                    if (buildableData.id !== updatedBuildableData.id) return buildableData;
                    return {
                        ...updatedBuildableData,
                        spritesheet: buildableData.spritesheet,
                    };
                }),
            };
        case ActionTypeEnum.CREATE_BUILDING:
            return {
                ...state,
                buildableDataList: [...state.buildableDataList, action.data],
            };
        case ActionTypeEnum.MOVE_BUILDING:
            return {
                ...state,
                buildableDataList: state.buildableDataList.map((buildableData: BuildableData) => {
                    const moveData = action.data as buildableMoveData;
                    if (buildableData.id === moveData.id) {
                        buildableData.location = {
                            x: moveData.x,
                            y: moveData.y,
                        };
                    }

                    return buildableData;
                }),
            };
        case ActionTypeEnum.DEMOLISH_BUILDING:
            return {
                ...state,
                buildableDataList: state.buildableDataList.filter((buildableData: BuildableData) => buildableData.id !== action.data),
            };
        default:
            return state;
    }
};

export default BuildableDataReducer;
