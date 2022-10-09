import SpritesheetLocation from "../spritesheet/SpritesheetLocation";

interface StaticBuildableData {
    name: string;
    xpWhenFinished: number;
    price: number;
    unlockedAtLevel: number;
    width: number;
    height: number;
    spritesheetLocation: SpritesheetLocation;
    spritesheet: string;
}

export default StaticBuildableData;
