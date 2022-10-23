import HouseInfoData from "../../../types/interfaces/world/HouseInfoData";
import ProgressBar from "../../shared/ProgressBar";

/**
 * Component that shows a brief info about the house
 * -> How much money is already accumulated out of the maximum
 * -> If the money can be collected already
 */
const HouseInfo = ({ houseInfo }: { houseInfo: HouseInfoData }) => {
    return (
        <div className="buildableInfo houseInfo">
            <div className="buildableInfo--background">
                <img src="./assets/ui/text_balloon.png" alt="text balloon" />
            </div>
            <div className="buildableInfo--foreground">
                <div>
                    <div className="houseInfo__name">{houseInfo.name}</div>
                    <div className="houseInfo__rent">
                        <ProgressBar value={houseInfo.rent} max={houseInfo.maxRent} displayMaxValue={true} />
                    </div>
                    {houseInfo.rent >= houseInfo.maxRent / 2 && <div className="houseInfo__collect">Collect</div>}
                </div>
            </div>
        </div>
    );
};

export default HouseInfo;
