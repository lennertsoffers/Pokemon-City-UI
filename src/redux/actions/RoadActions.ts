import RoadData from "../../types/interfaces/world/RoadData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_ROADS = (roadDataList: Array<RoadData>) => ({ type: ActionTypeEnum.LOAD_ROADS, data: roadDataList });
