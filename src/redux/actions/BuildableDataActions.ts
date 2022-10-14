import BuildableData from "../../types/interfaces/world/BuildableData";
import buildableMoveData from "../../types/interfaces/world/BuildableMoveData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_BUILDINGS = (buildableDataList: Array<BuildableData>) => ({ type: ActionTypeEnum.LOAD_BUILDINGS, data: buildableDataList });
export const UPDATE_BUILDING = (buildableData: BuildableData) => ({ type: ActionTypeEnum.UPDATE_BUILDING, data: buildableData });
export const CREATE_BUILDING = (buildableData: BuildableData) => ({ type: ActionTypeEnum.CREATE_BUILDING, data: buildableData });
export const MOVE_BUILDING = (buildableMoveData: buildableMoveData) => ({ type: ActionTypeEnum.MOVE_BUILDING, data: buildableMoveData });
export const DEMOLISH_BUILDING = (id: number) => ({ type: ActionTypeEnum.DEMOLISH_BUILDING, data: id });
