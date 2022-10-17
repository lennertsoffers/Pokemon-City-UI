import { combineReducers } from "redux";
import AuthReducer from "./AuthReducer";
import BuildableDataReducer from "./BuildableDataReducer";
import BuildableSelectorReducer from "./BuildableSelectorReducer";
import CitizenReducer from "./CitizenReducer";
import CitizenSelectorReducer from "./CitizenSelectorReducer";
import ErrorReducer from "./ErrorReducer";
import MapReducer from "./MapReducer";
import ModalReducer from "./ModalReducer";
import SelectedActionReducer from "./SelectedActionReducer";
import StaticDataReducer from "./StaticDataReducer";
import UserReducer from "./UserReducer";

const CombinedReducer = combineReducers({
    buildableDataState: BuildableDataReducer,
    buildableSelectorState: BuildableSelectorReducer,
    mapState: MapReducer,
    modalState: ModalReducer,
    staticDataState: StaticDataReducer,
    selectedActionState: SelectedActionReducer,
    citizenState: CitizenReducer,
    citizenSelectorState: CitizenSelectorReducer,
    userState: UserReducer,
    errorState: ErrorReducer,
    authState: AuthReducer,
});

export default CombinedReducer;
