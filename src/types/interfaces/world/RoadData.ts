import SpritesheetLocation from "../spritesheet/SpritesheetLocation";
import Position from "./Position";

interface RoadData {
    id: number;
    location: Position;
    spritesheetLocation: SpritesheetLocation;
}

export default RoadData;
