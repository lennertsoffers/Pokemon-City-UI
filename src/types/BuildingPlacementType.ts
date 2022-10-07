import PositionType from "./PositionType";
import SpritesheetLocationType from "./SpritesheetLocationType";

interface BuildingPlacementType {
    spritesheetLocation: SpritesheetLocationType;
    spriteSheet: string;
    bottomRightPosition: PositionType;
    chunkPosition: PositionType;
}

export default BuildingPlacementType;
