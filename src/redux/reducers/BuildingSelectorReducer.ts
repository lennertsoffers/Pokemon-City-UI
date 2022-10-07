import BuildableDataType from "../../types/BuildableDataType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

const BuildingSelectorReducer = (state: { type: BuildableDataType | null } = { type: null }, action: { type: ActionTypeEnum; data: BuildableDataType | undefined }) => {
    switch (action.type) {
        case ActionTypeEnum.SELECT_BUILDING:
            return {
                ...state,
                type: action.data,
            };
        case ActionTypeEnum.DESELECT_BUILDING:
            return {
                ...state,
                type: null,
            };
        default:
            return state;
    }
};

export default BuildingSelectorReducer;
