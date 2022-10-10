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

    return {
        toBuildablePlacement,
    };
})();

export default BuildablePlacementMapper;
