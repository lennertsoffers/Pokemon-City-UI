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

    return {
        getUserData,
    };
})();

export default UserService;
