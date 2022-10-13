import { useState } from "react";
import { useDispatch } from "react-redux";
import CityService from "../../api/CityService";
import { CLOSE_MODAL } from "../../redux/actions/ModalActions";
import { UPDATE_CITY_NAME } from "../../redux/actions/UserActions";

const CityName = ({ cityName }: { cityName: string }) => {
    const [cityNameText, setCityNameText] = useState(cityName);
    const dispatch = useDispatch();

    const handleCityNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setCityNameText(event.currentTarget.value);
    };

    const handleCityNameBlur = () => {
        if (cityNameText === cityName) return;

        CityService.changeName(cityNameText.trim(), (data: string) => {
            dispatch(UPDATE_CITY_NAME(data));
            dispatch(CLOSE_MODAL);
        });
    };

    return (
        <div className="cityName">
            <div className="cityName--background">
                <img src="./assets/ui/city_name_box.png" alt="city_name_box" />
            </div>
            <div className="cityName--foreground">
                <input type="text" value={cityNameText} onChange={handleCityNameChange} onBlur={handleCityNameBlur} />
            </div>
        </div>
    );
};

export default CityName;
