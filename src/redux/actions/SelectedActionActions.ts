import ActionEnum from "../../types/enums/ActionEnum";
import ActionTypeEnum from "./ActionTypeEnum";

export const SELECT_ACTION = (action: ActionEnum) => ({ type: ActionTypeEnum.SELECT_ACTION, data: action });
export const UNSELECT_ACTION = { type: ActionTypeEnum.UNSELECT_ACTION };
