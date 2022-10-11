import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import UserService from "../../../api/UserService";
import { FALLBACK_SPRITESHEET, TILE_WIDTH } from "../../../config/config";
import { DEMOLISH_BUILDING } from "../../../redux/actions/BuildablePlacementActions";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { OPEN_MODAL } from "../../../redux/actions/ModalActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import ModalTypeEnum from "../../../types/enums/ModalTypeEnum";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildablePlacement from "../../../types/interfaces/world/BuildablePlacement";
import Position from "../../../types/interfaces/world/Position";
import BuildablePlacementMapper from "../../../utils/mappers/BuildablePlacementMapper";
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

        if (buildablePlacement.buildableTypeEnum === "HOUSE") {
            dispatch(SELECT_BUILDING(BuildablePlacementMapper.toStaticBuildableData(buildablePlacement), buildablePlacement.id));
            dispatch(OPEN_MODAL(ModalTypeEnum.SELECT_CITIZEN_TO_DEMOLISH_MODAL));
        } else {
            BuildableService.demolishBuildable(buildablePlacement.id);
        }
    };

    const handleMove = () => {
        dispatch(SELECT_BUILDING({ ...buildablePlacement, type: buildablePlacement.buildableTypeEnum }, buildablePlacement.id));
    };

    const handleCollect = () => {
        // TODO - Handle response and error
        axios
            .get(`/api/incomeBuildings/collectRent/${buildablePlacement.id}`)
            .then((response) => {
                UserService.loadUserData();
                console.log(response.data);
            })
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
