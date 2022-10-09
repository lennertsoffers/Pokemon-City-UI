import BuildableData from "../../types/interfaces/world/BuildableData";
import BuildablePlacement from "../../types/interfaces/world/BuildablePlacement";
import SpritesheetUtils from "../SpritesheetUtils";

const BuildablePlacementMapper = (() => {
    const toBuildablePlacement = (buildableData: BuildableData): BuildablePlacement => {
        return {
            buildableId: buildableData.id,
            position: buildableData.location,
            spritesheet: SpritesheetUtils.getCorrespondingSpritesheet(buildableData.buildableTypeEnum, buildableData.specialisationType),
            spritesheetLocation: buildableData.spritesheetLocation,
        };
    };

    return {
        toBuildablePlacement,
    };
})();

export default BuildablePlacementMapper;
