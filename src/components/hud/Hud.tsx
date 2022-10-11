import { useDispatch, useSelector } from "react-redux";
import DataLoader from "../../api/DataLoader";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import CombinedState from "../../types/interfaces/states/CombinedState";
import Loading from "../Loading";

const Hud = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    const dispatch = useDispatch();

    const handleUserClick = () => {
        dispatch(OPEN_MODAL(ModalTypeEnum.STATISTICS_MODAL));
    };

    const handleCityNameClick = () => {
        dispatch(OPEN_MODAL(ModalTypeEnum.CHANGE_CITY_NAME_MODAL));
    };

    const handleCitizensClick = () => {
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
    };

    if (!userData) return <Loading />;
    return (
        <div className="hud">
            <div className="hud__left">
                <div onClick={handleUserClick}>
                    <div>{userData.username}</div>
                    <div>LV. {userData.level}</div>
                </div>
            </div>
            <div className="hud__center" onClick={handleCityNameClick}>
                <div>{userData.cityName}</div>
            </div>
            <div className="hud__right">
                <div>
                    <div>€{userData.money}</div>
                    <div onClick={handleCitizensClick}>👨‍👩‍👦‍👦{userData.citizens}</div>
                    <div>🌟{userData.satisfaction}</div>
                </div>
            </div>
        </div>
    );
};

export default Hud;
