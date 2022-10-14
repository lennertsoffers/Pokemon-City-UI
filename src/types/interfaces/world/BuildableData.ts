import SpritesheetLocation from "../spritesheet/SpritesheetLocation";
import Position from "./Position";

interface BuildableData {
    id: number;
    name: string;
    satisfactionModifier: number;
    xpWhenFinished: number;
    price: number;
    unlockedAtLevel: number;
    height: number;
    width: number;
    location: Position;
    spritesheetLocation: SpritesheetLocation;
    buildableTypeEnum: string;
    specialisationType: string;
    spritesheet: string;
}

export default BuildableData;
