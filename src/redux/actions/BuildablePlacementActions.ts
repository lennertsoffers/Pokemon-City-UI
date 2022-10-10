import buildableMoveData from "../../types/interfaces/world/BuildableMoveData";
import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_BUILDINGS = (buildablePlacements: Array<BuildablePlacement>) => ({ type: ActionTypeEnum.LOAD_BUILDINGS, data: buildablePlacements });
export const CREATE_BUILDING = (buildablePlacement: BuildablePlacement) => ({ type: ActionTypeEnum.CREATE_BUILDING, data: buildablePlacement });
export const MOVE_BUILDING = (buildableMoveData: buildableMoveData) => ({ type: ActionTypeEnum.MOVE_BUILDING, data: buildableMoveData });
export const DEMOLISH_BUILDING = (id: number) => ({ type: ActionTypeEnum.DEMOLISH_BUILDING, data: id });
