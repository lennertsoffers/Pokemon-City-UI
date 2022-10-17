import ActionTypeEnum from "./ActionTypeEnum";

export const SET_LOGGED_IN = (loggedIn: boolean) => ({ type: ActionTypeEnum.SET_LOGGED_IN, data: loggedIn });
