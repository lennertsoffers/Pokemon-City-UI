import { useSelector } from "react-redux";
import { FALLBACK_SPRITESHEET, TILE_WIDTH } from "../../../config/config";
import ActionEnum from "../../../types/enums/ActionEnum";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildablePlacement from "../../../types/interfaces/world/BuildablePlacement";
import Position from "../../../types/interfaces/world/Position";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";

const Buildable = ({ buildablePlacement }: { buildablePlacement: BuildablePlacement }) => {
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);

    const handleBuildingClick = () => {
        console.log(buildablePlacement.buildableId);
    };

    const pointerEvents = action === ActionEnum.BUILD || action === ActionEnum.MOVE ? "none" : "all";

    const location = buildablePlacement.spritesheetLocation;
    const spritesheet = buildablePlacement.spritesheet ? buildablePlacement.spritesheet : FALLBACK_SPRITESHEET;

    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const worldPosition: Position = buildablePlacement.position;

    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

    return (
        <div
            onClick={handleBuildingClick}
            style={{
                backgroundPosition: `${-dimensions.offsetLeft * TILE_WIDTH}px ${-dimensions.offsetTop}px`,
                backgroundImage: `url(./assets/spritesheets/${spritesheet}.png)`,
                transform: `translate(${worldPosition.x * TILE_WIDTH - displayWidth + TILE_WIDTH}px, ${worldPosition.y * TILE_WIDTH - displayHeight + TILE_WIDTH}px)`,
                width: `${displayWidth}px`,
                height: `${displayHeight}px`,
                position: `absolute`,
                left: `50%`,
                top: `50%`,
                display: `flex`,
                flexDirection: `column`,
                justifyContent: `end`,
                alignItems: `center`,
                pointerEvents: pointerEvents,
            }}
        />
    );
};

export default Buildable;
