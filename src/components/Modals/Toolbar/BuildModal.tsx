import { useSelector } from "react-redux";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StaticHouseData from "../../../types/interfaces/static/StaticHouseData";
import Modal from "../Modal";
import HouseDataCard from "./HouseDataCard";

const BuildModal = () => {
    const houseData: Array<StaticHouseData> = useSelector((state: CombinedState) => state.staticDataState.staticHouseData);

    return (
        <Modal title="Build">
            <div className="buildModal--inner">
                <div>
                    <h2>Houses</h2>
                    <div className="buildingSelector">
                        {houseData.map((houseData: StaticHouseData, index) => (
                            <HouseDataCard key={index} houseData={houseData} />
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BuildModal;
