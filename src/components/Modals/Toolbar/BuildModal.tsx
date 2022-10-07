import { useSelector } from "react-redux";
import BuildingStateType from "../../../types/BuildingStateType";
import HouseDataType from "../../../types/HouseDataType";
import Modal from "../Modal";
import HouseDataCard from "./HouseDataCard";

const BuildModal = () => {
    const { buildingData }: BuildingStateType = useSelector((state: any) => state.building);

    return (
        <Modal title="Build">
            <div className="buildModal--inner">
                <div>
                    <h2>Houses</h2>
                    <div className="buildingSelector">
                        {buildingData.houses.map((houseData: HouseDataType, index) => (
                            <HouseDataCard key={index} houseData={houseData} />
                        ))}
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default BuildModal;
