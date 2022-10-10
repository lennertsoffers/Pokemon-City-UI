import { COOKING_SPRITESHEET, FALLBACK_SPRITESHEET, HOUSE_SPRITESHEET, SELLING_SPRITESHEET, SERVICE_SPRITESHEET, SOCIAL_SPRITESHEET, TILES_IN_ROW } from "../config/config";
import SpritesheetDimension from "../types/interfaces/spritesheet/SpriteSheetDimension";
import SpritesheetLocation from "../types/interfaces/spritesheet/SpritesheetLocation";

const SpritesheetUtils = (() => {
    const getDimension = (spritesheetLocation: SpritesheetLocation): SpritesheetDimension => {
        // Offset from the most left tile of the spritesheet
        const offsetLeft = spritesheetLocation.topLeft % TILES_IN_ROW;
        const offsetTop = Math.floor(spritesheetLocation.topLeft / TILES_IN_ROW) * 32;

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

    const getCorrespondingSpritesheet = (buildableType: string, specialisationType: string): string => {
        switch (buildableType) {
            case "HOUSE":
                return HOUSE_SPRITESHEET;
            case "COMPANY":
                switch (specialisationType) {
                    case "COOKING":
                        return COOKING_SPRITESHEET;
                    case "SOCIAL":
                        return SOCIAL_SPRITESHEET;
                    case "SERVICE":
                        return SERVICE_SPRITESHEET;
                    case "SELLING":
                        return SELLING_SPRITESHEET;
                    default:
                        return FALLBACK_SPRITESHEET;
                }
            default:
                return FALLBACK_SPRITESHEET;
        }
    };

    return {
        getDimension,
        getCorrespondingSpritesheet,
    };
})();

export default SpritesheetUtils;
