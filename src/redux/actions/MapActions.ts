import MapData from "../../types/interfaces/world/MapData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_MAP_DATA = (data: MapData) => ({ type: ActionTypeEnum.LOAD_MAP_DATA, data: data });
