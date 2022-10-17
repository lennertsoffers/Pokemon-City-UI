import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import UserData from "../types/interfaces/user/UserData";

const UserService = (() => {
    const getUserData = async () => {
        try {
            const { data }: { data: UserData } = await axios.get("/users/me");
            return {
                ...data,
                satisfaction: Math.round(data.satisfaction * 100),
            };
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
