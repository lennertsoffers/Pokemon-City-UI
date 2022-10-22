import { useState } from "react";
import { useDispatch } from "react-redux";
import CityService from "../../api/CityService";
import { CLOSE_MODAL } from "../../redux/actions/ModalActions";
import { UPDATE_CITY_NAME } from "../../redux/actions/UserActions";

/**
 * Component showing the name of the city
 * Gives the user the functionality to change the name of the city by clicking on it, changing the text and blurring it
 * @param CityName The name of the city
 */
const CityName = ({ cityName }: { cityName: string }) => {
    const [cityNameText, setCityNameText] = useState(cityName);
    const dispatch = useDispatch();

    /**
     * Handles changing the text in the cityName input box
     * Sets the new value to of the input box to the state
     * @param event Change value event
     */
    const handleCityNameChange = (event: React.FormEvent<HTMLInputElement>) => {
        setCityNameText(event.currentTarget.value);
    };

    /**
     * Handles blurring the input box
     * If the name in the box is different than the effective city name, it calls the {@link CityService} to change the city name in the server
     */
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
