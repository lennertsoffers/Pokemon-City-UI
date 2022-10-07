import ActionTypeEnum from "../actions/ActionTypeEnum";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import ModalState from "../../types/interfaces/states/ModalState";

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

const initialState: ModalState = { modalVisibilityMap: getClosedModalVisiblity() };

const ModalReducer = (state = initialState, action: { type: ActionTypeEnum; modal: ModalTypeEnum }) => {
    let newVisibility;

    switch (action.type) {
        case ActionTypeEnum.OPEN_MODAL:
            newVisibility = getClosedModalVisiblity();
            newVisibility[action.modal] = true;

            return {
                ...state,
                modalVisibilityMap: newVisibility,
            };
        case ActionTypeEnum.CLOSE_MODAL:
            newVisibility = getClosedModalVisiblity();

            return {
                ...state,
                modalVisibilityMap: newVisibility,
            };
        default:
            return state;
    }
};

export default ModalReducer;
