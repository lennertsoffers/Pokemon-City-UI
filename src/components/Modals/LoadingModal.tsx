import Modal from "./Modal";

const LoadingModal = () => {
    return (
        <Modal imageSource="./assets/ui/modal.png">
            <div className="loadingModal">
                <div className="loadingModal__inner">
                    <div>
                        <div>Loading...</div>
                        <img src="./assets/gif/loading.gif" alt="loading-gif" />
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default LoadingModal;
