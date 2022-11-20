import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";
import UserData from "../types/interfaces/user/UserData";

/** Collects functions to handle Api requests concerning users */
const UserService = (() => {
    /**
     * Queries the Api for the current user's data
     * @returns The current user's data
     */
    const getUserData = async () => {
        try {
            const { data }: { data: UserData } = await axios.get("/api/users/me");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Sends an update request to the Api to update the users statistics
     * @param time The time to be added to the current playTime in minutes
     */
    const updateStatistics = (time: number) => {
        axios.post("/api/users/me/updateStatistics", { sessionTime: time });
    };

    return {
        getUserData,
        updateStatistics,
    };
})();

export default UserService;
