import ActionTypeEnum from "../../types/enums/ActionTypeEnum";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";

const getClosedModalVisiblity = () => {
    let modalVisibility: any = {};

    Object.keys(ModalTypeEnum)
        .filter((key) => isNaN(Number(key)))
        .forEach((key: string) => {
            modalVisibility = {
                ...modalVisibility,
                [key]: false,
            };
        });

    return modalVisibility;
};

const ModalReducer = (state = { modalVisibility: getClosedModalVisiblity() }, action: { type: ActionTypeEnum; modal: ModalTypeEnum }) => {
    let newVisibility;

    switch (action.type) {
        case ActionTypeEnum.OPEN_MODAL:
            newVisibility = getClosedModalVisiblity();
            newVisibility[action.modal] = true;

            return {
                ...state,
                modalVisibility: newVisibility,
            };
        case ActionTypeEnum.CLOSE_MODAL:
            newVisibility = getClosedModalVisiblity();

            return {
                ...state,
                modalVisibility: newVisibility,
            };
        default:
            return state;
    }
};

export default ModalReducer;
