import { useDispatch, useSelector } from "react-redux";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { SELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticBuildableData from "../../../types/interfaces/static/StaticBuildableData";
import StringUtils from "../../../utils/StringUtils";

const BuildableCard = ({ buildableData, onClick, children }: { buildableData: StaticBuildableData; onClick: Function; children: Array<JSX.Element> }) => {
    const userLevel = useSelector((state: CombinedState) => state.userState.userData?.level);
    const dispatch = useDispatch();

    const handleClick = () => {
        onClick();

        dispatch(SELECT_BUILDING(buildableData));
        dispatch(SELECT_ACTION(ActionEnum.BUILD));
        dispatch(CLOSE_MODAL);
    };

    const isUnlocked = userLevel && userLevel >= buildableData.unlockedAtLevel;

    if (isUnlocked)
        return (
            <div className="buildingCard buildingCard--unlocked" onClick={handleClick}>
                <div className="buildingCard__row">
                    <div className="buildingCard__image">
                        <img src={"./assets/images/" + StringUtils.toConstantName(buildableData.name) + ".png"} alt="buildable" />
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
