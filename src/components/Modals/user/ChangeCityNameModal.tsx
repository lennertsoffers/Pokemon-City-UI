import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CityService from "../../../api/CityService";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { UPDATE_CITY_NAME } from "../../../redux/actions/UserActions";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import LoadingModal from "../LoadingModal";
import Modal from "../Modal";

const ChangeCityNameModal = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    const [cityNameText, setCityNameText] = useState<string>("");

    const handleCityNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setCityNameText(event.currentTarget.value);
    };

    const handleSaveNameClick = () => {
        CityService.changeName(cityNameText.trim(), (data: string) => {
            dispatch(UPDATE_CITY_NAME(data));
            dispatch(CLOSE_MODAL);
        });
    };

    useEffect(() => {
        if (!userData) setCityNameText("text");
        else setCityNameText(userData.cityName);
    }, [userData]);

    if (!userData) return <LoadingModal />;
    return (
        <Modal title={"Change name of city"}>
            <div>
                <input type="text" value={cityNameText} onChange={handleCityNameChange} />
                <div>
                    <button onClick={handleSaveNameClick}>Save</button>
                </div>
            </div>
        </Modal>
    );
};

export default ChangeCityNameModal;
