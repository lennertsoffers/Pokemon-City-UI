import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import ActionTypeEnum from "./ActionTypeEnum";

export const CREATE_BUILDING = (data: BuildablePlacement) => ({ type: ActionTypeEnum.CREATE_BUILDING, data: data });
