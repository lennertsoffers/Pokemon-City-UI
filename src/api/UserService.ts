import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

const UserService = (() => {
    const getUserData = async () => {
        try {
            const { data } = await axios.get("/users/me");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    const updateStatistics = (time: number) => {
        axios.post("/users/me/updateStatistics", { sessionTime: time });
    };

    return {
        getUserData,
        updateStatistics,
    };
})();

export default UserService;
