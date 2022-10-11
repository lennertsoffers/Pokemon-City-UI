import { useSelector } from "react-redux";
import CombinedState from "../../types/interfaces/states/CombinedState";

const Hud = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);

    // TODO - Loader
    if (!userData) return <div>Loading...</div>;

    return (
        <div className="hud">
            <div className="hud__left">
                <div>
                    <div>{userData.username}</div>
                    <div>LV. {userData.level}</div>
                </div>
            </div>
            <div className="hud__center">
                <div>{userData.cityName}</div>
            </div>
            <div className="hud__right">
                <div>
                    <div>€{userData.money}</div>
                    <div>👨‍👩‍👦‍👦{userData.citizens}</div>
                    <div>🌟{userData.satisfaction}</div>
                </div>
            </div>
        </div>
    );
};

export default Hud;
