import StaticBuildableData from "../../types/interfaces/static/StaticBuildableData";
import BuildableData from "../../types/interfaces/world/BuildableData";
import SpritesheetUtils from "../SpritesheetUtils";

const BuildableDataMapper = (() => {
    const toBuildableData = (buildableData: BuildableData): BuildableData => {
        return {
            ...buildableData,
            spritesheet: SpritesheetUtils.getCorrespondingSpritesheet(buildableData.buildableTypeEnum, buildableData.specialisationType),
        };
    };

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
