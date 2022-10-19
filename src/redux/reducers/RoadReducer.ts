import RoadState from "../../types/interfaces/states/RoadState";
import RoadData from "../../types/interfaces/world/RoadData";
import ActionTypeEnum from "../actions/ActionTypeEnum";

const initialState: RoadState = { roads: [] };

const RoadReducer = (state: RoadState = initialState, action: { type: ActionTypeEnum; data: Array<RoadData> }) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_ROADS:
            return {
                ...state,
                roads: action.data,
            };
        default:
            return state;
    }
};

export default RoadReducer;
