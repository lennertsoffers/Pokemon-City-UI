import BuildablePlacementState from "./BuildablePlacementState";
import BuildableSelectorState from "./BuildableSelectorState";
import CitizenSelectorState from "./CitizenSelectorState";
import CitizenState from "./CitizenState";
import MapState from "./MapState";
import ModalState from "./ModalState";
import SelectedActionState from "./SelectedActionState";
import StaticDataState from "./StaticDataState";
import UserState from "./UserState";

interface CombinedState {
    buildablePlacementState: BuildablePlacementState;
    buildableSelectorState: BuildableSelectorState;
    mapState: MapState;
    modalState: ModalState;
    staticDataState: StaticDataState;
    selectedActionState: SelectedActionState;
    citizenState: CitizenState;
    citizenSelectorState: CitizenSelectorState;
    userState: UserState;
}

export default CombinedState;
