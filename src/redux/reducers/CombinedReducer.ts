import { combineReducers } from "redux";
import BuildingReducer from "./BuildingReducer";
import BuildingSelectorReducer from "./BuildingSelectorReducer";
import MapReducer from "./MapReducer";
import ModalReducer from "./ModalReducer";

const CombinedReducer = combineReducers({
    modal: ModalReducer,
    building: BuildingReducer,
    mapData: MapReducer,
    buildingSelector: BuildingSelectorReducer,
});

export default CombinedReducer;
