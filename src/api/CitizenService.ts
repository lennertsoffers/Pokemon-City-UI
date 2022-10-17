import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

const CitizenService = (() => {
    const getCitizens = async () => {
        try {
            const { data } = await axios.get("/api/citizens");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    const getUnassignedCitizens = async () => {
        try {
            const response = await axios.get("/api/citizens/unassigned");
            return response.data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    const assignCitizen = async (citizenId: number, companyId: number, successCallback: Function) => {
        const data = {
            citizenId: citizenId,
            companyId: companyId,
        };

        try {
            await axios.put("/api/citizens/assign", data);
            successCallback();
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    const unassignCitizen = async (citizenId: number, successCallback: Function) => {
        try {
            await axios.put(`/api/citizens/unAssign/${citizenId}`);
            successCallback();
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    return {
        getCitizens,
        getUnassignedCitizens,
        assignCitizen,
        unassignCitizen,
    };
})();

export default CitizenService;
