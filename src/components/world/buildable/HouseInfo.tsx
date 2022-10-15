import HouseInfoData from "../../../types/interfaces/world/HouseInfoData";
import ProgressBar from "../../shared/ProgressBar";

const HouseInfo = ({ houseInfo }: { houseInfo: HouseInfoData }) => {
    return (
        <div className="buildableInfo houseInfo">
            <div className="houseInfo__name">{houseInfo.name}</div>
            <div className="houseInfo__rent">
                <ProgressBar value={houseInfo.rent} max={houseInfo.maxRent} displayMaxValue={true} />
            </div>
            <div className="houseInfo__citizens">{houseInfo.numberOfCitizens}</div>
            {houseInfo.rent >= houseInfo.maxRent / 2 && <div>Collect</div>}
        </div>
    );
};

export default HouseInfo;
