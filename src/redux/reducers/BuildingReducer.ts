import BuildingDataType from "../../types/BuildingDataType";
import BuildingStateType from "../../types/BuildingStateType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

const BuildingReducer = (state: BuildingStateType | null = null, action: { type: ActionTypeEnum; data: BuildingDataType }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_BUILDING_DATA:
            return {
                ...state,
                buildingData: action.data,
            };
        default:
            return state;
    }
};

export default BuildingReducer;
