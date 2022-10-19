import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import StringUtils from "../../../utils/StringUtils";
import BuildableCard from "./BuildableCard";

const HouseDataCard = ({ houseData }: { houseData: StaticHouseData }) => {
    return (
        <BuildableCard buildableData={houseData}>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Rent:</div>
                <div>{StringUtils.simplify(houseData.rentPerMinute)} €/min</div>
            </div>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Max Rent:</div>
                <div>{StringUtils.simplify(houseData.maxRent)} €</div>
            </div>
            <div className="buildingCard__field">
                <div className="buildingCard__label">Citizens:</div>
                <div>{StringUtils.simplify(houseData.numberOfCitizens)}</div>
            </div>
        </BuildableCard>
    );
};

export default HouseDataCard;
