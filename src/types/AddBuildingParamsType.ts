import PositionType from "./PositionType";
import SpritesheetLocationType from "./SpritesheetLocationType";

interface AddBuildingParamsType {
    spritesheetLocation: SpritesheetLocationType;
    spriteSheet: string;
    bottomRightPosition: PositionType;
}

export default AddBuildingParamsType;
