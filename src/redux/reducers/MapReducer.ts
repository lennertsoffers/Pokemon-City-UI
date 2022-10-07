import MapState from "../../types/interfaces/states/MapState";
import MapData from "../../types/interfaces/world/MapData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: MapState = { mapData: null };

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
