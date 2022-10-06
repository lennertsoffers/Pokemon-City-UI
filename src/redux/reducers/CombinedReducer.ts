import { combineReducers } from "redux";
import BuildingReducer from "./BuildingReducer";
import ModalReducer from "./ModalReducer";

const CombinedReducer = combineReducers({
    modal: ModalReducer,
    building: BuildingReducer,
});

export default CombinedReducer;
