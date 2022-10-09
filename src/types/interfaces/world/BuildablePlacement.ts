import SpritesheetLocation from "../spritesheet/SpritesheetLocation";
import Position from "./Position";

interface BuildablePlacement {
    buildableId: number;
    spritesheetLocation: SpritesheetLocation;
    spritesheet: string;
    position: Position;
}

export default BuildablePlacement;
