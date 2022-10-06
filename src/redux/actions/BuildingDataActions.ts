import BuildingDataType from "../../types/BuildingDataType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

export const LOAD_BUILDING_DATA = (buildingData: BuildingDataType) => ({ type: ActionTypeEnum.LOAD_BUILDING_DATA, data: buildingData });
