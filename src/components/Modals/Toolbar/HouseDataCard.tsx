import { useDispatch } from "react-redux";
import { SELECT_BUILDING } from "../../../redux/actions/BuildingSelectorActions";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import HouseDataType from "../../../types/HouseDataType";

const HouseDataCard = ({ houseData }: { houseData: HouseDataType }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(SELECT_BUILDING(houseData));
        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="houseCard" onClick={handleClick}>
            <div>
                <img src={"./assets/images/" + houseData.name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase() + ".png"} alt="house" />
            </div>
            <div>{houseData.name}</div>
            <div>€{houseData.price}</div>
            <div>{houseData.rentPerMinute} euro/min</div>
            <div>€{houseData.maxRent}</div>
            <div>{houseData.xpWhenFinished}XP</div>
            <div>{houseData.unlockedAtLevel}</div>
            <div>
                {houseData.width}x{houseData.height}
            </div>
        </div>
    );
};

export default HouseDataCard;
