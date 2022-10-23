import { useDispatch, useSelector } from "react-redux";
import DataLoader from "../../api/DataLoader";
import { OPEN_MODAL } from "../../redux/actions/ModalActions";
import ModalTypeEnum from "../../types/enums/ModalTypeEnum";
import CombinedState from "../../types/interfaces/states/CombinedState";
import StringUtils from "../../utils/StringUtils";
import Loading from "../Loading";
import Toolbar from "./Toolbar";
import CityName from "./CityName";
import UserInfo from "./UserInfo";
import ValueBox from "./ValueBox";

/** Component that contains all the hud elements that are shown on top of the game world */
const Hud = () => {
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    const dispatch = useDispatch();

    /**
     * Opens the staticstics modal when the user info is clicked
     */
    const handleUserClick = () => {
        DataLoader.loadUserData();
        dispatch(OPEN_MODAL(ModalTypeEnum.STATISTICS_MODAL));
    };

    /**
     * Opens the citizens modal when the citizens value box is clicked
     */
    const handleCitizensClick = () => {
        DataLoader.loadCitizens();
        dispatch(OPEN_MODAL(ModalTypeEnum.CITIZENS_MODAL));
    };

    // Only show the hud if the user data is loaded
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
                    <ValueBox value={`€ ${StringUtils.simplify(userData.money)}`} />
                    <ValueBox value={`👨‍👩‍👦‍👦${StringUtils.simplify(userData.citizens)}`} onClick={handleCitizensClick} link={true} />
                    <ValueBox value={`🌟${userData.satisfaction}`} />
                </div>
            </div>
            <Toolbar />
        </div>
    );
};

export default Hud;
