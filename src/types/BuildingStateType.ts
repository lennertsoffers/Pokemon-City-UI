import BuildingDataType from "./BuildingDataType";
import BuildingPlacementType from "./BuildingPlacementType";

interface BuildingStateType {
    buildingData: BuildingDataType;
    buildingMap: Array<BuildingPlacementType>;
}

export default BuildingStateType;
