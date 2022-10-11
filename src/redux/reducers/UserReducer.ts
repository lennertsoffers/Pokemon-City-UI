import UserState from "../../types/interfaces/states/UserState";
import UserData from "../../types/interfaces/user/UserData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: UserState = { userData: null };

const UserReducer = (state: UserState = initialState, action: { type: ActionTypeEnum; data: UserData }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_USER_DATA:
            return {
                ...state,
                userData: action.data,
            };
        default:
            return state;
    }
};

export default UserReducer;
