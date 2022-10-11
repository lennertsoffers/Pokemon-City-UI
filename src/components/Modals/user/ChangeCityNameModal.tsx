import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CLOSE_MODAL } from "../../../redux/actions/ModalActions";
import { UPDATE_CITY_NAME } from "../../../redux/actions/UserActions";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import Modal from "../Modal";

const ChangeCityNameModal = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state: CombinedState) => state.userState.userData);
    const [cityNameText, setCityNameText] = useState<string>("");

    const handleCityNameChange = (event: any) => {
        setCityNameText(event.target.value);
    };

    const handleSaveNameClick = () => {
        axios
            .post("/api/city/changeName", { name: cityNameText.trim() })
            .then(({ data }: { data: string }) => {
                dispatch(UPDATE_CITY_NAME(data));
                dispatch(CLOSE_MODAL);
            })
            .catch((error) => {
                // TODO - Handle Error
                console.log(error);
            });
    };

    useEffect(() => {
        if (!userData) setCityNameText("text");
        else setCityNameText(userData.cityName);
    }, [userData]);

    // TODO - Handle Loading
    if (!userData) return <div>Loading...</div>;
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
