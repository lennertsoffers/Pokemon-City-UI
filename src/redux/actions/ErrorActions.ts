import ActionTypeEnum from "./ActionTypeEnum";

export const ADD_ERROR = (message: string) => ({ type: ActionTypeEnum.ADD_ERROR, data: message });
export const REMOVE_ERROR = (uuid: string) => ({ type: ActionTypeEnum.REMOVE_ERROR, data: uuid });
