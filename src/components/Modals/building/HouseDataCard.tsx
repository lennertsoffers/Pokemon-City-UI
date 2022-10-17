import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import BuildableCard from "./BuildableCard";

const HouseDataCard = ({ houseData }: { houseData: StaticHouseData }) => {
    return (
        <BuildableCard buildableData={houseData}>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Rent:</div>
                <div>{houseData.rentPerMinute} €/min</div>
            </div>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Max Rent:</div>
                <div>{houseData.maxRent}€</div>
            </div>
        </BuildableCard>
    );
};

export default HouseDataCard;
