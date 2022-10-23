import AuthState from "../../types/interfaces/states/AuthState";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: AuthState = { loggedIn: false };

/**
 * Reducer that contains the {@link AuthState}
 * It holds data about wether the user is logged in or not
 */
const AuthReducer = (state: AuthState = initialState, action: { type: ActionTypeEnum; data: boolean }) => {
    switch (action.type) {
        case ActionTypeEnum.SET_LOGGED_IN:
            return {
                ...state,
                loggedIn: action.data,
            };
        default:
            return state;
    }
};

export default AuthReducer;
