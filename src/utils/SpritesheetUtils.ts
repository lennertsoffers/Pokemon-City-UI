import {
    COOKING_SPRITESHEET,
    DECORATION_SPRITESHEET,
    FALLBACK_SPRITESHEET,
    HOUSE_SPRITESHEET,
    SELLING_SPRITESHEET,
    SERVICE_SPRITESHEET,
    SOCIAL_SPRITESHEET,
    TILES_IN_ROW,
    TILE_WIDTH,
} from "../config/config";
import ResizeData from "../types/interfaces/spritesheet/ResizeData";
import SpritesheetDimension from "../types/interfaces/spritesheet/SpriteSheetDimension";
import SpritesheetLocation from "../types/interfaces/spritesheet/SpritesheetLocation";

/** Module containing util functions concerning spritesheets */
const SpritesheetUtils = (() => {
    /**
     * Calculates the dimensions of the object on the spriteshee given the first and last tile index
     * @param spritesheetLocation The index of the first and last tile of the object on the spritesheet
     * @returns The width, height, offsetLeft and offset top of that object on the spritesheet
     */
    const getDimension = (spritesheetLocation: SpritesheetLocation): SpritesheetDimension => {
        // Offset from the most left tile of the spritesheet
        const offsetLeft = spritesheetLocation.topLeft % TILES_IN_ROW;
        const offsetTop = Math.floor(spritesheetLocation.topLeft / TILES_IN_ROW) * TILE_WIDTH;

        // Width is the difference between the top left tile and the bottom right divided by tiles in a row plus 1
        const width = ((spritesheetLocation.bottomRight - spritesheetLocation.topLeft) % TILES_IN_ROW) + 1;
        const height = Math.floor((spritesheetLocation.bottomRight - spritesheetLocation.topLeft) / TILES_IN_ROW) + 1;

        return {
            width: width,
            height: height,
            offsetLeft: offsetLeft,
            offsetTop: offsetTop,
        };
    };

    /**
     * Reads the buildable type and optional specialisation and returns the corresponding spritesheet
     */
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

    /**
     * Takes the original width and height of the object (based on the {@link TILE_WIDTH}) and resizes it to the maxWidth and maxHeight without losing the aspect ratio
     * @returns The new width, height and the factor the original grid was resized with
     */
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
