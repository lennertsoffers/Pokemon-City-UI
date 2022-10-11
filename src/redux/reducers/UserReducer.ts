import UserState from "../../types/interfaces/states/UserState";
import UserData from "../../types/interfaces/user/UserData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: UserState = { userData: null };

const UserReducer = (state: UserState = initialState, action: { type: ActionTypeEnum; data: UserData | string }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_USER_DATA:
            return {
                ...state,
                userData: action.data,
            };
        case ActionTypeEnum.UPDATE_CITY_NAME:
            return {
                ...state,
                userData: {
                    ...state.userData,
                    cityName: action.data,
                },
            };
        default:
            return state;
    }
};

export default UserReducer;
