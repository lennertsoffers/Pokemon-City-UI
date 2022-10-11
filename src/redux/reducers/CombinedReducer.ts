import { combineReducers } from "redux";
import BuildablePlacementReducer from "./BuildablePlacementReducer";
import BuildableSelectorReducer from "./BuildableSelectorReducer";
import CitizenReducer from "./CitizenReducer";
import CitizenSelectorReducer from "./CitizenSelectorReducer";
import MapReducer from "./MapReducer";
import ModalReducer from "./ModalReducer";
import SelectedActionReducer from "./SelectedActionReducer";
import StaticDataReducer from "./StaticDataReducer";
import UserReducer from "./UserReducer";

const CombinedReducer = combineReducers({
    buildablePlacementState: BuildablePlacementReducer,
    buildableSelectorState: BuildableSelectorReducer,
    mapState: MapReducer,
    modalState: ModalReducer,
    staticDataState: StaticDataReducer,
    selectedActionState: SelectedActionReducer,
    citizenState: CitizenReducer,
    citizenSelectorState: CitizenSelectorReducer,
    userState: UserReducer,
});

export default CombinedReducer;
