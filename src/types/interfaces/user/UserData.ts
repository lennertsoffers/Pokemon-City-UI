import UserStatistics from "./UserStatistics";

interface UserData {
    id: number;
    username: string;
    xp: number;
    level: number;
    money: number;
    citizens: number;
    satisfaction: number;
    cityName: string;
    statistics: UserStatistics;
}

export default UserData;
