import BuildingPlacementType from "../../types/BuildingPlacementType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";
import MapDataType from "../../types/MapDataType";

const MapReducer = (state: MapDataType | null = null, action: { type: ActionTypeEnum; data: MapDataType | BuildingPlacementType }) => {
    let data;

    switch (action.type) {
        case ActionTypeEnum.LOAD_MAP_DATA:
            data = action.data as MapDataType;

            return {
                ...state,
                chunksX: data.chunksX,
                chunksY: data.chunksY,
                layers: data.layers,
            };
        default:
            return state;
    }
};

export default MapReducer;
