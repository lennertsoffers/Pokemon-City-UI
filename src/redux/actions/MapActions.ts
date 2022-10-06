import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

export const CREATE_BUILDING = (data: any) => ({ type: ActionTypeEnum.CREATE_BUILDING, data: data });
export const LOAD_MAP_DATA = (data: any) => ({ type: ActionTypeEnum.LOAD_MAP_DATA, data: data });
