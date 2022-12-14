import AuthState from "./AuthState";
import BuildableDataState from "./BuildableDataState";
import BuildableSelectorState from "./BuildableSelectorState";
import CitizenSelectorState from "./CitizenSelectorState";
import CitizenState from "./CitizenState";
import ErrorState from "./ErrorState";
import MapState from "./MapState";
import ModalState from "./ModalState";
import RoadState from "./RoadState";
import SelectedActionState from "./SelectedActionState";
import StaticDataState from "./StaticDataState";
import UserState from "./UserState";

interface CombinedState {
    buildableDataState: BuildableDataState;
    buildableSelectorState: BuildableSelectorState;
    mapState: MapState;
    modalState: ModalState;
    staticDataState: StaticDataState;
    selectedActionState: SelectedActionState;
    citizenState: CitizenState;
    citizenSelectorState: CitizenSelectorState;
    userState: UserState;
    errorState: ErrorState;
    authState: AuthState;
    roadState: RoadState;
}

export default CombinedState;
