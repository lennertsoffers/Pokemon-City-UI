import axios from "axios";

const UserService = (() => {
    const getUserData = async () => {
        try {
            const { data } = await axios.get("/users/me");
            return data;
        } catch (error) {
            console.log(error);
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
