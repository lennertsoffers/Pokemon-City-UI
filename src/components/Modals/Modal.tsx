import { useDispatch } from "react-redux";
import { CLOSE_MODAL } from "../../redux/actions/ModalActions";
import ModalProperties from "../../types/ModalProperties";

const Modal = (properties: ModalProperties) => {
    const dispatch = useDispatch();

    const handleClickPage = (e: any) => {
        if (e.target.classList.contains("modal")) {
            handleClose();
        }
    };

    const handleClose = () => {
        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="modal" onClick={handleClickPage}>
            <div className="modal--inner">
                <header>
                    <div>{properties.title}</div>
                    <div onClick={handleClose}>X</div>
                </header>
                {properties.children}
            </div>
        </div>
    );
};

export default Modal;
