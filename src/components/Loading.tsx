/**
 * Component that fill the whole screen with a loading animation
 */
const Loading = () => {
    return (
        <div className="loading">
            <div>
                <div>Loading...</div>
                <img src="./assets/gif/loading.gif" alt="loading-gif" />
            </div>
        </div>
    );
};

export default Loading;
