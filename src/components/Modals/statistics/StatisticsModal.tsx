import { useSelector } from "react-redux";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Modal from "../Modal";

const StatisticsModal = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);

    // TODO - Handle loading
    if (!userData) return <div>Loading...</div>;

    return (
        <Modal title={"Stats"}>
            <div>
                <div>{userData.username}</div>
                <div>
                    LV. {userData.level} - {userData.xp}XP
                </div>
                <div>
                    <div>{userData.cityName}:</div>
                    <div>👨‍👩‍👦‍👦{userData.citizens}</div>
                    <div>🌟{userData.satisfaction}</div>
                </div>
                <div>
                    <div>Statistics</div>
                    <div>
                        <div>
                            <div>Time Played: {userData.statistics.timePlayed}</div>
                        </div>
                        <div>
                            <div>Buildings Built: {userData.statistics.buildingsBuilt}</div>
                            <div>Buildings Demolished: {userData.statistics.buildingsDemolished}</div>
                        </div>
                        <div>
                            <div>Total Values: {userData.statistics.totalValue}</div>
                            <div>Money Collected: {userData.statistics.moneyCollected}</div>
                            <div>Money Spent: {userData.statistics.moneySpent}</div>
                            <div>Income Per Minute: {userData.statistics.incomePerMinute}</div>
                        </div>
                        <div>
                            <div>Citizens With Max Statistic: {userData.statistics.maxedCitizens}</div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default StatisticsModal;
