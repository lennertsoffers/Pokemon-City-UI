import { useRef } from "react";
import { useSelector } from "react-redux";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import LoadingModal from "../LoadingModal";
import Modal from "../Modal";

const StatisticsModal = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    const modalData = useRef<any>(undefined);

    const handleScrollDownClick = () => {
        if (!modalData) return;

        const newY = modalData.current.scrollTop + 20;

        modalData.current.scrollTo(0, newY);
    };

    if (!userData) return <LoadingModal />;
    return (
        <Modal title={"Stats"} imageSource="./assets/ui/statistics.png">
            <div className="statisticsModal">
                <h2>Stats</h2>
                <div className="statisticsModal__username">
                    <div>{userData.username}</div>
                </div>
                <div onMouseDown={handleScrollDownClick} className="statisticsModal__scrollDown">
                    <img src="./assets/ui/link_pointer.png" alt="down" />
                </div>
                <div ref={modalData} className="statisticsModal__data">
                    <div className="statisticsModal__data__section">
                        <h3>Level</h3>
                        <div className="statisticsModal__data__topic">
                            <div>Level</div>
                            <div>{userData.level}</div>
                        </div>
                        <div className="statisticsModal__data__topic">
                            <div>Experience</div>
                            <div>{userData.xp} xp</div>
                        </div>
                    </div>
                    <div className="statisticsModal__data__section">
                        <h3>{userData.cityName}</h3>
                        <div className="statisticsModal__data__topic">
                            <div>Citizens</div>
                            <div>{userData.citizens}</div>
                        </div>
                        <div className="statisticsModal__data__topic">
                            <div>Employed Citizens</div>
                            <div>{userData.employedCitizens}</div>
                        </div>
                        <div className="statisticsModal__data__topic">
                            <div>Satisfaction</div>
                            <div>{userData.satisfaction}</div>
                        </div>
                    </div>
                    <div className="statisticsModal__data__section">
                        <h3>Statistics</h3>
                        <div>
                            <div className="statisticsModal__data__topic">
                                <div>Time Played</div>
                                <div>{Math.round((userData.statistics.timePlayed / 60) * 100) / 100} h</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Buildings built</div>
                                <div>{userData.statistics.buildingsBuilt}</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Buildings demolished</div>
                                <div>{userData.statistics.buildingsDemolished}</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Total Value</div>
                                <div>{userData.statistics.totalValue} eur</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Money Collected</div>
                                <div>{userData.statistics.moneyCollected} eur</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Money Spent</div>
                                <div>{userData.statistics.moneySpent} eur</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Income Per Minute</div>
                                <div>{userData.statistics.incomePerMinute} eur/min</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Maxed Citizens</div>
                                <div>{userData.statistics.maxedCitizens}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default StatisticsModal;
