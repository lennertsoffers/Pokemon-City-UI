import axios from "axios";

const CityService = (() => {
    const changeName = async (newName: string, successCallback: Function) => {
        try {
            const { data } = await axios.post("/api/city/changeName", { name: newName });
            successCallback(data);
        } catch (error) {
            console.log(error);
        }
    };

    return {
        changeName,
    };
})();

export default CityService;
