import BuildablePlacementState from "./BuildablePlacementState";
import BuildableSelectorState from "./BuildableSelectorState";
import MapState from "./MapState";
import ModalState from "./ModalState";
import SelectedActionState from "./SelectedActionState";
import StaticDataState from "./StaticDataState";

interface CombinedState {
    buildablePlacementState: BuildablePlacementState;
    buildableSelectorState: BuildableSelectorState;
    mapState: MapState;
    modalState: ModalState;
    staticDataState: StaticDataState;
    selectedActionState: SelectedActionState;
}

export default CombinedState;
