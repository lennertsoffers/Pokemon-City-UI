import Modal from "./Modal";

const LoadingModal = () => {
    return (
        <Modal title={""}>
            <div className="loadingModal">
                <div>
                    <div>Loading...</div>
                    <img src="./assets/gif/loading.gif" alt="loading-gif" />
                </div>
            </div>
        </Modal>
    );
};

export default LoadingModal;
