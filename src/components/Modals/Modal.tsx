import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../redux/actions/ModalActions";
import ModalProperties from "../../types/interfaces/world/ModalProperties";

const Modal = (properties: ModalProperties) => {
    const dispatch = useDispatch();

    const handleClickPage = (e: any) => {
        if (e.target.classList.contains("modal")) {
            handleClose();
        }
    };

    const handleClose = () => {
        if (properties.onClose) {
            properties.onClose();
        }

        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="modal" onClick={handleClickPage}>
            <div className="modal--inner">
                <header>
                    <h1>{properties.title}</h1>
                    <div onClick={handleClose}>X</div>
                </header>
                <div className="modal--inner__children">{properties.children}</div>
            </div>
        </div>
    );
};

export default Modal;
