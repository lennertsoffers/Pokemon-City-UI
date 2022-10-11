import { useDispatch } from "react-redux";
import { SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { SELECT_ACTION } from "../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import StaticBuildableData from "../../../types/interfaces/static/StaticBuildableData";
import StringUtils from "../../../utils/StringUtils";

const BuildableCard = ({ buildableData, onClick, children }: { buildableData: StaticBuildableData; onClick: Function; children: Array<JSX.Element> }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        onClick();

        dispatch(SELECT_BUILDING(buildableData));
        dispatch(SELECT_ACTION(ActionEnum.BUILD));
        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="buildingCard" onClick={handleClick}>
            <div>
                <img src={"./assets/images/" + StringUtils.toConstantName(buildableData.name) + ".png"} alt="buildable" />
            </div>
            <div>{buildableData.name}</div>
            <div>€{buildableData.price}</div>
            <div>{buildableData.xpWhenFinished}XP</div>
            <div>{buildableData.unlockedAtLevel}</div>
            {children}
            <div>
                {buildableData.width}x{buildableData.height}
            </div>
        </div>
    );
};

export default BuildableCard;
