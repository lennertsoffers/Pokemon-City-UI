import StaticBuildableData from "../../types/interfaces/static/StaticBuildableData";
import BuildableData from "../../types/interfaces/world/BuildableData";
import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import SpritesheetUtils from "../SpritesheetUtils";

const BuildablePlacementMapper = (() => {
    const toBuildablePlacement = (buildableData: BuildableData): BuildablePlacement => {
        return {
            ...buildableData,
            spritesheet: SpritesheetUtils.getCorrespondingSpritesheet(buildableData.buildableTypeEnum, buildableData.specialisationType),
        };
    };

    const toStaticBuildableData = (buildablePlacement: BuildablePlacement): StaticBuildableData => {
        return {
            name: buildablePlacement.name,
            height: buildablePlacement.height,
            width: buildablePlacement.width,
            price: buildablePlacement.price,
            spritesheet: buildablePlacement.spritesheet,
            spritesheetLocation: buildablePlacement.spritesheetLocation,
            type: buildablePlacement.buildableTypeEnum,
            unlockedAtLevel: buildablePlacement.unlockedAtLevel,
            xpWhenFinished: buildablePlacement.xpWhenFinished,
        };
    };

    return {
        toBuildablePlacement,
        toStaticBuildableData,
    };
})();

export default BuildablePlacementMapper;
