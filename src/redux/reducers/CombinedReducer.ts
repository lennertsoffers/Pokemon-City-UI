import { combineReducers } from "redux";
import BuildingReducer from "./BuildingReducer";
import MapReducer from "./MapReducer";
import ModalReducer from "./ModalReducer";

const CombinedReducer = combineReducers({
    modal: ModalReducer,
    building: BuildingReducer,
    mapData: MapReducer,
});

export default CombinedReducer;
