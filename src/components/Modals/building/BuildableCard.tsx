import { useDispatch, useSelector } from "react-redux";
import { CARD_IMAGE_MAX_HEIGHT, CARD_IMAGE_MAX_WIDTH, FALLBACK_SPRITESHEET, SPRITESHEET_WIDTH, TILE_WIDTH } from "../../../config/config";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { SELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import ResizeData from "../../../types/interfaces/spritesheet/ResizeData";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticBuildableData from "../../../types/interfaces/static/StaticBuildableData";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import StringUtils from "../../../utils/StringUtils";

/** Component that displays generic buildable data */
const BuildableCard = ({ buildableData, children }: { buildableData: StaticBuildableData; children?: Array<JSX.Element> }) => {
    const userLevel = useSelector((state: CombinedState) => state.userState.userData?.level);
    const dispatch = useDispatch();

    /**
     * Selects the buildable in the {@link BuildableSelectorState} and selects the {@link ActionEnum.BUILD} action in the {@link SelectedActionState}
     */
    const handleClick = () => {
        dispatch(SELECT_BUILDING(buildableData));
        dispatch(SELECT_ACTION(ActionEnum.BUILD));
        dispatch(CLOSE_MODAL);
    };

    // True if the level of the user is greater or equal to the level the buildable unlocks
    const isUnlocked = userLevel && userLevel >= buildableData.unlockedAtLevel;

    // Location on the spritesheet
    const location = buildableData.spritesheetLocation;
    // The spritesheet stored in the buildableData or the fallback if its not found
    const spritesheet = buildableData.spritesheet ? buildableData.spritesheet : FALLBACK_SPRITESHEET;
    // Calculate the spritsheetDimenisons from the spritesheetLocation
    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    // The width and height the sprite would be displayed on a not resized grid
    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;
    // Resize the grid data to dimensions smaller than CARD_IMAGE_MAX WIDTH and HEIGHT
    const resizeData: ResizeData = SpritesheetUtils.resizeToMaxWidthHeight(CARD_IMAGE_MAX_WIDTH, CARD_IMAGE_MAX_HEIGHT, displayWidth, displayHeight);
    // Get the background size for the spritesheet in the resized grid with the resizeFactor from the resizeData
    const adjustedBackgroundSize = resizeData.resizeFactor === 1 ? SPRITESHEET_WIDTH : SPRITESHEET_WIDTH / resizeData.resizeFactor;

    // Only display the buildable if its unlocked for the current user
    if (isUnlocked)
        return (
            <div className="buildingCard buildingCard--unlocked" onClick={handleClick}>
                <div className="buildingCard__row">
                    <div className="buildingCard__image">
                        <div
                            style={{
                                height: `${resizeData.newHeight}px`,
                                width: `${resizeData.newWidth}px`,
                                backgroundImage: `url("./assets/spritesheets/${spritesheet}.png")`,
                                backgroundPosition: `${(-dimensions.offsetLeft / resizeData.resizeFactor) * TILE_WIDTH}px ${-dimensions.offsetTop / resizeData.resizeFactor}px`,
                                backgroundSize: `${adjustedBackgroundSize}px auto`,
                            }}
                        ></div>
                    </div>
                    <div>
                        <div className="buildingCard__name">{buildableData.name}</div>
                        <div className="buildingCard__field">
                            <div className="buildingCard__label">Price:</div>
                            <div className="buildingCard__value">{StringUtils.simplify(buildableData.price)} €</div>
                        </div>
                        <div className="buildingCard__field">
                            <div className="buildingCard__label">XP:</div>
                            <div className="buildingCard__value">{StringUtils.simplify(buildableData.xpWhenFinished)} xp</div>
                        </div>
                        <div className="buildingCard__field">
                            <div className="buildingCard__label">Size:</div>
                            <div className="buildingCard__value">
                                {buildableData.width}x{buildableData.height}
                            </div>
                        </div>
                        <div className="buildingCard__field">
                            <div className="buildingCard__label">🌟:</div>
                            <div className="buildingCard__value">{buildableData.satisfactionModifier}</div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        );
    // Otherwise display a locked buildable card
    return (
        <div className="buildingCard buildingCard--locked">
            <div className="buildingCard--locked__center">?</div>
            <div className="buildingCard--locked__bottom">Unlocks at level {buildableData.unlockedAtLevel}</div>
        </div>
    );
};

export default BuildableCard;
