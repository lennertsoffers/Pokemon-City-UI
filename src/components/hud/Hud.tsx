import { useDispatch, useSelector } from "react-redux";
import DataLoader from "../../api/DataLoader";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import CombinedState from "../../types/interfaces/states/CombinedState";
import Loading from "../Loading";
import CityName from "./CityName";
import UserInfo from "./UserInfo";
import ValueBox from "./ValueBox";

const Hud = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    const dispatch = useDispatch();

    const handleUserClick = () => {
        dispatch(OPEN_MODAL(ModalTypeEnum.STATISTICS_MODAL));
    };

    const handleCitizensClick = () => {
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
    };

    if (!userData) return <Loading />;
    return (
        <div className="hud">
            <div className="hud__left">
                <UserInfo onClick={handleUserClick} username={userData.username} level={userData.level} />
            </div>
            <div>
                <CityName cityName={userData.cityName} />
            </div>
            <div className="hud__right">
                <div>
                    <ValueBox value={`€${userData.money}`} />
                    <ValueBox value={`👨‍👩‍👦‍👦${userData.citizens}`} onClick={handleCitizensClick} link={true} />
                    <ValueBox value={`🌟${userData.satisfaction}`} />
                </div>
            </div>
        </div>
    );
};

export default Hud;
