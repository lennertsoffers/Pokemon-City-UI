import ActionTypeEnum from "../actions/ActionTypeEnum";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import ModalState from "../../types/interfaces/states/ModalState";

/**
 * Creates a map for all the keys in the ModalTypeEnum
 * Each value gets set to flalse
 * @returns The map for all modals and their visibility
 */
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

/**
 * Reducer that contains the {@link ModalState}
 * The modalstate is a map with all the modals in the application as a key and a boolean to indicate if the modal is currently visible
 * - OPEN_MODAL: Sets the value to true for the modal provided, false for the other modals
 * - CLOSE_MODAL: Sets the value to false for every modal
 */
const ModalReducer = (state: ModalState = initialState, action: { type: ActionTypeEnum; modal: ModalTypeEnum }) => {
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
