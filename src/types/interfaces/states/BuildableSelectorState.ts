import StaticBuildableData from "../static/StaticBuildableData";

interface BuildableSelectorState {
    selectedBuildable: StaticBuildableData | null;
    id?: number;
}

export default BuildableSelectorState;
