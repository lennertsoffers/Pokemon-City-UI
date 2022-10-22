import ErrorMessageData from "../../types/interfaces/error/ErrorMessageData";
import ErrorState from "../../types/interfaces/states/ErrorState";
import Uuid from "../../utils/Uuid";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: ErrorState = { errorMessages: [] };

/**
 * Reducer that contains the {@link ErrorState}
 * The ErrorState contains a list of {@link ErrorMessageData} of all the errors currently shown
 * When an error is added by the message, the ErrorMessageData gets an unique uuid
 * Errors can be removed by there unique uuid
 */
const ErrorReducer = (state: ErrorState = initialState, action: { type: ActionTypeEnum; data: string }) => {
    switch (action.type) {
        case ActionTypeEnum.ADD_ERROR:
            return {
                ...state,
                errorMessages: [...state.errorMessages, { message: action.data, uuid: Uuid.generateUUID() }],
            };
        case ActionTypeEnum.REMOVE_ERROR:
            return {
                ...state,
                errorMessages: state.errorMessages.filter((errorMessage: ErrorMessageData) => errorMessage.uuid !== action.data),
            };
        default:
            return state;
    }
};

export default ErrorReducer;
