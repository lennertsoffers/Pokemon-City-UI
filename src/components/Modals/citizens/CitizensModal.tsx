import { useSelector } from "react-redux";
import CitizenData from "../../../types/interfaces/citizens/CitizenData";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import LoadingModal from "../LoadingModal";
import Modal from "../Modal";
import CitizenCard from "./CitizenCard";

const CitizensModal = () => {
    const amountOfCitizens = useSelector((state: CombinedState) => state.userState.userData?.citizens);
    const citizens = useSelector((state: CombinedState) => state.citizenState.citizens);

    if (!amountOfCitizens || amountOfCitizens !== citizens.length) return <LoadingModal />;
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
