import {
    COOKING_SPRITESHEET,
    DECORATION_SPRITESHEET,
    FALLBACK_SPRITESHEET,
    HOUSE_SPRITESHEET,
    SELLING_SPRITESHEET,
    SERVICE_SPRITESHEET,
    SOCIAL_SPRITESHEET,
    SPRITESHEET_WIDTH,
    TILES_IN_ROW,
    TILE_WIDTH,
} from "../config/config";
import ResizeData from "../types/interfaces/spritesheet/ResizeData";
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
            case "DECORATION":
                return DECORATION_SPRITESHEET;
            default:
                return FALLBACK_SPRITESHEET;
        }
    };

    const resizeToMaxWidthHeight = (maxWidth: number, maxHeight: number, displayWidth: number, displayHeight: number): ResizeData => {
        let a = 1;
        let height = displayHeight;
        let width = displayWidth;

        if (displayWidth > maxWidth) {
            a = displayWidth / maxWidth;
            width = maxWidth;
            height = displayHeight / a;
        }

        if (height > maxHeight) {
            a = displayHeight / maxHeight;
            height = maxHeight;
            width = displayWidth / a;
        }

        return {
            newHeight: height,
            newWidth: width,
            resizeFactor: a,
        };
    };

    return {
        getDimension,
        getCorrespondingSpritesheet,
        resizeToMaxWidthHeight,
    };
})();

export default SpritesheetUtils;
