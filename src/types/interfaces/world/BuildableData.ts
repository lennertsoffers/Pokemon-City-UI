import SpritesheetLocation from "../spritesheet/SpritesheetLocation";

interface BuildableData {
    id: number;
    name: string;
    satisfactionModifier: number;
    xpWhenFinished: number;
    price: number;
    unlockedAtLevel: number;
    height: number;
    width: number;
    location: Location;
    buildableTypeEnum: string;
    spritesheetLocation: SpritesheetLocation;
}

export default BuildableData;
