import HouseDataType from "../../../types/HouseDataType";

const HouseDataCard = ({ houseData }: { houseData: HouseDataType }) => {
    return (
        <div>
            <div>{houseData.name}</div>
            <div>
                <img src={"./assets/images/" + houseData.name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase() + ".png"} alt="house" />
            </div>
        </div>
    );
};

export default HouseDataCard;
