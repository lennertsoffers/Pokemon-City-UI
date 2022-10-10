import { useSelector } from "react-redux";
import CitizenData from "../../../../types/interfaces/citizens/CitizenData";
import CombinedState from "../../../../types/interfaces/states/CombinedState";
import Modal from "../../Modal";
import CitizenCard from "./CitizenCard";

const CitizensModal = () => {
    const citizens = useSelector((state: CombinedState) => state.citizenState.citizens);

    return (
        <Modal title="Citizens">
            <div className="citizenModal--inner">
                {citizens.map((citizenData: CitizenData) => (
                    <CitizenCard citizenData={citizenData} key={citizenData.id} />
                ))}
            </div>
        </Modal>
    );
};

export default CitizensModal;
