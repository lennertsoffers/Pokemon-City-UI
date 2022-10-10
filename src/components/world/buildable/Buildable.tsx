import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { FALLBACK_SPRITESHEET, TILE_WIDTH } from "../../../config/config";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildablePlacement from "../../../types/interfaces/world/BuildablePlacement";
import Position from "../../../types/interfaces/world/Position";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";

const Buildable = ({ buildablePlacement }: { buildablePlacement: BuildablePlacement }) => {
    const { selectedBuildable, id } = useSelector((state: CombinedState) => state.buildableSelectorState);
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const dispatch = useDispatch();

    const handleBuildingClick = () => {
        switch (action) {
            case ActionEnum.DEMOLISH:
                return handleDemolish();
            case ActionEnum.MOVE:
                return handleMove();
            case ActionEnum.NONE:
                return handleCollect();
        }
    };

    const handleDemolish = () => {
        // TODO - Handle response and error

        console.log("demolish");

        // axios
        //     .delete(`/api/buildables/demolish`, {
        //         data: {
        //             buildableId: buildablePlacement.id,
        //             citizenIds: [10, 20],
        //         },
        //     })
        //     .then((response) => {
        //         console.log(response.data);
        //         dispatch(DEMOLISH_BUILDING(buildablePlacement.id));
        //     })
        //     .catch((error) => console.log(error.response.data));
    };

    const handleMove = () => {
        dispatch(SELECT_BUILDING({ ...buildablePlacement, type: buildablePlacement.buildableTypeEnum }, buildablePlacement.id));
    };

    const handleCollect = () => {
        // TODO - Handle response and error
        axios
            .get(`/api/incomeBuildings/collectRent/${buildablePlacement.id}`)
            .then((response) => console.log(response.data))
            .catch((error) => console.log(error.response.data));
    };

    const pointerEvents = selectedBuildable ? "none" : "all";

    const location = buildablePlacement.spritesheetLocation;
    const spritesheet = buildablePlacement.spritesheet ? buildablePlacement.spritesheet : FALLBACK_SPRITESHEET;

    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const worldPosition: Position = buildablePlacement.location;

    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

    const displayMoveOverlay = action === ActionEnum.MOVE && selectedBuildable !== null && id === buildablePlacement.id;

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
        >
            {displayMoveOverlay && (
                <div
                    style={{
                        border: `4px dashed rgba(0, 0, 150, 0.8)`,
                        backgroundColor: `rgba(0, 0, 255, 0.3)`,
                        height: `${selectedBuildable.height * TILE_WIDTH}px`,
                        width: `${selectedBuildable.width * TILE_WIDTH}px`,
                    }}
                />
            )}
        </div>
    );
};

export default Buildable;
