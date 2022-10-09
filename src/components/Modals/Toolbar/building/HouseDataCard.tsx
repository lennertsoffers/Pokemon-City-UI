import { HOUSE_SPRITESHEET } from "../../../../config/config";
import StaticHouseData from "../../../../types/interfaces/static/StaticHouseData";
import BuildableCard from "./BuildableCard";

const HouseDataCard = ({ houseData }: { houseData: StaticHouseData }) => {
    const handleClick = () => {
        houseData.spritesheet = HOUSE_SPRITESHEET;
    };

    return (
        <BuildableCard buildableData={houseData} onClick={handleClick}>
            <div>{houseData.rentPerMinute} €/min</div>
            <div>€{houseData.maxRent}</div>
        </BuildableCard>
    );
};

export default HouseDataCard;
