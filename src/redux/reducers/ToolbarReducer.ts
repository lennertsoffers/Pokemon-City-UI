import ActionTypeEnum from "../../types/enums/ActionTypeEnum";
import ToolbarStateEnum from "../../types/enums/ToolbarStateEnum";

const ToolbarReducer = (state: ToolbarStateEnum = ToolbarStateEnum.CLOSED, action: { type: ActionTypeEnum }) => {
    switch (action.type) {
        case ActionTypeEnum.OPEN_BUILD_MENU:
            return ToolbarStateEnum.BUILD;
        case ActionTypeEnum.OPEN_ACTIONS_MENU:
            return ToolbarStateEnum.ACTIONS;
        case ActionTypeEnum.OPEN_CITIZENS_MENU:
            return ToolbarStateEnum.CITIZENS;
        case ActionTypeEnum.CLOSE_MENU:
            return ToolbarStateEnum.CLOSED;
        default:
            return state;
    }
};

export default ToolbarReducer;
