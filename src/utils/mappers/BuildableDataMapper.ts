import StaticBuildableData from "../../types/interfaces/static/StaticBuildableData";
import BuildableData from "../../types/interfaces/world/BuildableData";
import SpritesheetUtils from "../SpritesheetUtils";

/**
 * Mapper that contains functions to map {@link BuildableData} to another type of buildable data
 */
const BuildableDataMapper = (() => {
    /**
     * Maps buildable data without a spritesheet to buildable data with the correct spritesheet by v
     * @param buildableData The buildable data to map
     * @returns The buildable with the correct spritesheet set
     */
    const toBuildableData = (buildableData: BuildableData): BuildableData => {
        return {
            ...buildableData,
            spritesheet: SpritesheetUtils.getCorrespondingSpritesheet(buildableData.buildableTypeEnum, buildableData.specialisationType),
        };
    };

    /**
     * Maps buildable data to {@link StaticBuildableData}
     * @param buildableData The buildable data to map
     * @returns The static buildable data mapped from the data
     */
    const toStaticBuildableData = (buildableData: BuildableData): StaticBuildableData => {
        return {
            name: buildableData.name,
            height: buildableData.height,
            width: buildableData.width,
            price: buildableData.price,
            spritesheet: buildableData.spritesheet,
            spritesheetLocation: buildableData.spritesheetLocation,
            type: buildableData.buildableTypeEnum,
            unlockedAtLevel: buildableData.unlockedAtLevel,
            xpWhenFinished: buildableData.xpWhenFinished,
            satisfactionModifier: buildableData.satisfactionModifier,
        };
    };

    return {
        toBuildableData: toBuildableData,
        toStaticBuildableData,
    };
})();

export default BuildableDataMapper;
