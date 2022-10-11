import UserData from "../../types/interfaces/user/UserData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_USER_DATA = (userData: UserData) => ({ type: ActionTypeEnum.LOAD_USER_DATA, data: userData });
export const UPDATE_CITY_NAME = (newName: string) => ({ type: ActionTypeEnum.UPDATE_CITY_NAME, data: newName });
