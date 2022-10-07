import ActionTypeEnum from "./ActionTypeEnum";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";

export const OPEN_MODAL = (modal: ModalTypeEnum) => ({ type: ActionTypeEnum.OPEN_MODAL, modal: modal });
export const CLOSE_MODAL = { type: ActionTypeEnum.CLOSE_MODAL };
