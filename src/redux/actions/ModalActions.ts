import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

export const OPEN_MODAL = (modal: String) => ({ type: ActionTypeEnum.OPEN_MODAL, modal: modal });
export const CLOSE_MODAL = (modal: String) => ({ type: ActionTypeEnum.CLOSE_MODAL, modal: modal });
