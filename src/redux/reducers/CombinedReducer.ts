import { combineReducers } from "redux";
import BuildablePlacementReducer from "./BuildablePlacementReducer";
import BuildableSelectorReducer from "./BuildableSelectorReducer";
import MapReducer from "./MapReducer";
import ModalReducer from "./ModalReducer";
import StaticDataReducer from "./StaticDataReducer";

const CombinedReducer = combineReducers({
    buildablePlacementState: BuildablePlacementReducer,
    buildableSelectorState: BuildableSelectorReducer,
    mapState: MapReducer,
    modalState: ModalReducer,
    staticDataState: StaticDataReducer,
});

export default CombinedReducer;
