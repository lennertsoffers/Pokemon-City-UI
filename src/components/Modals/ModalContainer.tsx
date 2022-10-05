import { useSelector } from "react-redux";
import ActionsModal from "./Toolbar/ActionsModal";
import BuildModal from "./Toolbar/BuildModal";
import CitizensModal from "./Toolbar/CitizensModal";

const ModalContainer = () => {
    const { modalVisibility } = useSelector((state: any) => state.modal);

    return (
        <div>
            {modalVisibility.BUILD_MODAL && <BuildModal />}
            {modalVisibility.ACTIONS_MODAL && <ActionsModal />}
            {modalVisibility.CITIZENS_MODAL && <CitizensModal />}
        </div>
    );
};

export default ModalContainer;
