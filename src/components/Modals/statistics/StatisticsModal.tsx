import { useRef } from "react";
import { useSelector } from "react-redux";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import StringUtils from "../../../utils/StringUtils";
import LoadingModal from "../LoadingModal";
import Modal from "../Modal";

/**
 * Modal container that shows the current user's statistics
 *
 * Extends - {@link Modal}
 */
const StatisticsModal = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    // References the list of statistics
    const modalData = useRef<any>(undefined);

    /**
     * Handles clicking the arrow pointing down in the modal by scrolling down in the statistics
     */
    const handleScrollDownClick = () => {
        // The ref to modalData will only exist if the userData is loaded
        if (!modalData) return;

        // Set the new scroll y position to be 20 more than the previous scroll y position
        const newY = modalData.current.scrollTop + 20;
        modalData.current.scrollTo(0, newY);
    };

    // Show the loading modal if the userdata is not loaded yet
    if (!userData) return <LoadingModal />;
    return (
        <Modal imageSource="./assets/ui/statistics.png">
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
                            <div>{StringUtils.simplify(userData.xp)} xp</div>
                        </div>
                    </div>
                    <div className="statisticsModal__data__section">
                        <h3>{userData.cityName}</h3>
                        <div className="statisticsModal__data__topic">
                            <div>Citizens</div>
                            <div>{StringUtils.simplify(userData.citizens)}</div>
                        </div>
                        <div className="statisticsModal__data__topic">
                            <div>Employed Citizens</div>
                            <div>{StringUtils.simplify(userData.employedCitizens)}</div>
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
                                <div>{StringUtils.simplify(userData.statistics.totalValue)} €</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Money Collected</div>
                                <div>{StringUtils.simplify(userData.statistics.moneyCollected)} €</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Money Spent</div>
                                <div>{StringUtils.simplify(userData.statistics.moneySpent)} €</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Income Per Minute</div>
                                <div>{StringUtils.simplify(userData.statistics.incomePerMinute)} €/min</div>
                            </div>
                            <div className="statisticsModal__data__topic">
                                <div>Maxed Citizens</div>
                                <div>{StringUtils.simplify(userData.statistics.maxedCitizens)}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

export default StatisticsModal;
