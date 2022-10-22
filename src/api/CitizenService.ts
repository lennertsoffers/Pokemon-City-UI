import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

/** Collects functions to handle Api requests concerning Citizens */
const CitizenService = (() => {
    /**
     * Queries the Api for all the citizens that live in the user's city
     * @returns A list of all the user's citizens
     */
    const getCitizens = async () => {
        try {
            const { data } = await axios.get("/api/citizens");
            return data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Queries the Api for all the citizens that live in the user's city but are not assigned to a company
     * @returns A list of all the user's citizens that are not assigned to a company
     */
    const getUnassignedCitizens = async () => {
        try {
            const response = await axios.get("/api/citizens/unassigned");
            return response.data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Tries to assign a citizen to the company
     * @param citizenId The id of the citizen that should be assigned
     * @param companyId The id of the company where the citizen should be assigned
     * @param successCallback The callback that gets executed when the server responds with OK status
     */
    const assignCitizen = async (citizenId: number, companyId: number, successCallback: Function) => {
        // Format the body as an object
        const body = {
            citizenId: citizenId,
            companyId: companyId,
        };

        try {
            await axios.put("/api/citizens/assign", body);

            // Gets executed if there was no error thrown by executing the request
            successCallback();
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    /**
     * Tries to unassign a certain citizen
     * Unassignment is only successful if the given citizen is indeed assigned to a company
     * @param citizenId The citizen that should be unassigned
     * @param successCallback The callback that gets executed when te server responds with OK status
     */
    const unassignCitizen = async (citizenId: number, successCallback: Function) => {
        try {
            await axios.put(`/api/citizens/unAssign/${citizenId}`);

            // Gets executed if there was no error thrown by executing the request
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
