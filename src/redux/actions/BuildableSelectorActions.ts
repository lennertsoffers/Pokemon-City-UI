import StaticBuildableData from "../../types/interfaces/static/StaticBuildableData";
import ActionTypeEnum from "./ActionTypeEnum";

export const SELECT_BUILDING = (buildableData: StaticBuildableData | null, id?: number) => ({ type: ActionTypeEnum.SELECT_BUILDING, data: buildableData, id: id });
export const DESELECT_BUILDING = { type: ActionTypeEnum.DESELECT_BUILDING };
