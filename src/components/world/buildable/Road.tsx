import { useSelector } from "react-redux";
import { TILE_WIDTH } from "../../../config/config";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Position from "../../../types/interfaces/world/Position";
import RoadData from "../../../types/interfaces/world/RoadData";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import ActionEnum from "../../../types/enums/ActionEnum";
import BuildableService from "../../../api/BuildableService";
import DataLoader from "../../../api/DataLoader";

const Road = ({ roadData }: { roadData: RoadData }) => {
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);

    const handleRoadClick = () => {
        if (action === ActionEnum.DEMOLISH) {
            BuildableService.demolishBuildable(roadData.id, () => {
                DataLoader.loadRoads();
            });
        }
    };

    const location = roadData.spritesheetLocation;
    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const worldPosition: Position = roadData.location;
    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

    const pointerEvents = action === ActionEnum.DEMOLISH ? "all" : "none";

    return (
        <div
            onClick={handleRoadClick}
            style={{
                backgroundPosition: `${-dimensions.offsetLeft * TILE_WIDTH}px ${-dimensions.offsetTop}px`,
                backgroundImage: `url(./assets/spritesheets/road_spritesheet.png)`,
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
                zIndex: `${200 + worldPosition.y}`,
            }}
        ></div>
    );
};

export default Road;
