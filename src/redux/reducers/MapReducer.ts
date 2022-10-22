import MapState from "../../types/interfaces/states/MapState";
import MapData from "../../types/interfaces/world/MapData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: MapState = { mapData: null };

/**
 * Reducer that contains the {@link MapState}
 * The MapState has a {@link MapData}
 * The MapData can be a file directly exported from the Tiled program
 */
const MapReducer = (state: MapState = initialState, action: { type: ActionTypeEnum; data: MapData }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_MAP_DATA:
            return {
                ...state,
                mapData: action.data,
            };
        default:
            return state;
    }
};

export default MapReducer;
