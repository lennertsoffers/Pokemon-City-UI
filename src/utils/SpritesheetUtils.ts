import { TILES_IN_ROW } from "../config/config";
import SpritesheetDimension from "../types/interfaces/spritesheet/SpriteSheetDimension";
import SpritesheetLocation from "../types/interfaces/spritesheet/SpritesheetLocation";

const SpritesheetUtils = (() => {
    const getDimension = (spritesheetLocation: SpritesheetLocation): SpritesheetDimension => {
        // Offset from the most left tile of the spritesheet
        const offsetLeft = spritesheetLocation.topLeft % TILES_IN_ROW;
        const offsetTop = Math.floor((spritesheetLocation.topLeft / TILES_IN_ROW) * 32);

        // Width is the difference between the top left tile and the bottom right divided by tiles in a row plus 1
        const width = ((spritesheetLocation.bottomRight - spritesheetLocation.topLeft) % 8) + 1;
        const height = Math.floor((spritesheetLocation.bottomRight - spritesheetLocation.topLeft) / 8) + 1;

        return {
            width: width,
            height: height,
            offsetLeft: offsetLeft,
            offsetTop: offsetTop,
        };
    };

    return {
        getDimension,
    };
})();

export default SpritesheetUtils;
