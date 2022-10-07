import SpritesheetLocation from "../spritesheet/SpritesheetLocation";
import Position from "./Position";

interface BuildablePlacement {
    spritesheetLocation: SpritesheetLocation;
    spriteSheet: string;
    bottomRightPosition: Position;
    chunkPosition: Position;
}

export default BuildablePlacement;
