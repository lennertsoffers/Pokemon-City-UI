import { useDispatch, useSelector } from "react-redux";
import { FALLBACK_SPRITESHEET, SPRITESHEET_WIDTH, TILES_IN_ROW, TILE_WIDTH } from "../../../config/config";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { SELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import ResizeData from "../../../types/interfaces/spritesheet/ResizeData";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticBuildableData from "../../../types/interfaces/static/StaticBuildableData";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";

const BuildableCard = ({ buildableData, children }: { buildableData: StaticBuildableData; children?: Array<JSX.Element> }) => {
    const userLevel = useSelector((state: CombinedState) => state.userState.userData?.level);
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(SELECT_BUILDING(buildableData));
        dispatch(SELECT_ACTION(ActionEnum.BUILD));
        dispatch(CLOSE_MODAL);
    };

    const isUnlocked = userLevel && userLevel >= buildableData.unlockedAtLevel;

    const location = buildableData.spritesheetLocation;
    const spritesheet = buildableData.spritesheet ? buildableData.spritesheet : FALLBACK_SPRITESHEET;
    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

    const resizeData: ResizeData = SpritesheetUtils.resizeToMaxWidthHeight(130, 130, displayWidth, displayHeight);
    const adjustedBackgroundSize = resizeData.resizeFactor === 1 ? SPRITESHEET_WIDTH : SPRITESHEET_WIDTH / resizeData.resizeFactor;

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
                            <div className="buildingCard__value">{buildableData.price}€</div>
                        </div>
                        <div className="buildingCard__field">
                            <div className="buildingCard__label">XP:</div>
                            <div className="buildingCard__value">{buildableData.xpWhenFinished}xp</div>
                        </div>
                        <div className="buildingCard__field">
                            <div className="buildingCard__label">Size:</div>
                            <div className="buildingCard__value">
                                {buildableData.width}x{buildableData.height}
                            </div>
                        </div>
                    </div>
                </div>
                {children}
            </div>
        );

    return (
        <div className="buildingCard buildingCard--locked">
            <div className="buildingCard--locked__center">?</div>
            <div className="buildingCard--locked__bottom">Unlocks at level {buildableData.unlockedAtLevel}</div>
        </div>
    );
};

export default BuildableCard;
