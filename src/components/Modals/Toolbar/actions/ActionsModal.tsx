import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../../../redux/actions/ModalActions";
import { SELECT_ACTION } from "../../../../redux/actions/SelectedActionActions";
import ActionEnum from "../../../../types/enums/ActionEnum";
import Modal from "../../Modal";

const ActionsModal = () => {
    const dispatch = useDispatch();

    const handleMoveClick = () => {
        dispatch(SELECT_ACTION(ActionEnum.MOVE));
        dispatch(CLOSE_MODAL);
    };

    const handleDemolishClick = () => {
        dispatch(SELECT_ACTION(ActionEnum.DEMOLISH));
        dispatch(CLOSE_MODAL);
    };

    return (
        <Modal title="test">
            <div>
                <button onClick={handleMoveClick}>MOVE</button>
                <button onClick={handleDemolishClick}>DEMOLISH</button>
            </div>
        </Modal>
    );
};

export default ActionsModal;
