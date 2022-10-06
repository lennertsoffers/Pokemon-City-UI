import HouseDataType from "../../../types/HouseDataType";

const HouseDataCard = ({ houseData }: { houseData: HouseDataType }) => {
    return (
        <div className="houseCard">
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
