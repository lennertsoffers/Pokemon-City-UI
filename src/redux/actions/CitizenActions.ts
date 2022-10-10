import CitizenData from "../../types/interfaces/citizens/CitizenData";
import ActionTypeEnum from "./ActionTypeEnum";

export const LOAD_CITIZENS = (citizens: Array<CitizenData>) => ({ type: ActionTypeEnum.LOAD_CITIZENS, data: citizens });
