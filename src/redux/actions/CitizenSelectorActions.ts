import ActionTypeEnum from "./ActionTypeEnum";

export const SELECT_CITIZEN = (citizenId: number) => ({ type: ActionTypeEnum.SELECT_CITIZEN, data: citizenId });
export const UNSELECT_CITIZEN = { type: ActionTypeEnum.UNSELECT_CITIZEN };
