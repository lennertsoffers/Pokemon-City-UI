import BuildableDataType from "../../types/BuildableDataType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

export const SELECT_BUILDING = (type: BuildableDataType) => ({ type: ActionTypeEnum.SELECT_BUILDING, data: type });
export const DESELECT_BUILDING = { type: ActionTypeEnum.DESELECT_BUILDING };
