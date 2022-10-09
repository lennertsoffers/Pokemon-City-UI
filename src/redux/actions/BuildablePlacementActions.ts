import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_BUILDINGS = (data: Array<BuildablePlacement>) => ({ type: ActionTypeEnum.LOAD_BUILDINGS, data: data });
export const CREATE_BUILDING = (data: BuildablePlacement) => ({ type: ActionTypeEnum.CREATE_BUILDING, data: data });
