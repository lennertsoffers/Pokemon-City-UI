import { useDispatch } from "react-redux";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { SELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";

const BuildableCard = (properties: any) => {
    const dispatch = useDispatch();
    const buildableData = properties.buildableData;

    const handleClick = () => {
        properties.onClick();

        dispatch(SELECT_BUILDING(buildableData));
        dispatch(SELECT_ACTION(ActionEnum.BUILD));
        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="buildingCard" onClick={handleClick}>
            <div>
                <img src={"./assets/images/" + buildableData.name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase() + ".png"} alt="buildable" />
            </div>
            <div>{buildableData.name}</div>
            <div>€{buildableData.price}</div>
            <div>{buildableData.xpWhenFinished}XP</div>
            <div>{buildableData.unlockedAtLevel}</div>
            {properties.children}
            <div>
                {buildableData.width}x{buildableData.height}
            </div>
        </div>
    );
};

export default BuildableCard;
