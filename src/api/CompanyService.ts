import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

/** Collects functions to handle Api requests concerning companies */
const CompanyService = (() => {
    /**
     * Gets a list of all the user's companies with there assigned citizens
     * @returns A list of companies with their employees
     */
    const getCompaniesWithEmployees = async () => {
        try {
            const response = await axios.get("/api/companies");
            return response.data;
        } catch (error) {
            ErrorHandler.handle(error);
        }
    };

    return {
        getCompaniesWithEmployees,
    };
})();

export default CompanyService;
