import BuildingPlacementType from "../../types/BuildingPlacementType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";
import MapDataType from "../../types/MapDataType";

export const CREATE_BUILDING = (data: BuildingPlacementType) => ({ type: ActionTypeEnum.CREATE_BUILDING, data: data });
export const LOAD_MAP_DATA = (data: MapDataType) => ({ type: ActionTypeEnum.LOAD_MAP_DATA, data: data });
