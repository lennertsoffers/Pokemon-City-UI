import axios from "axios";
import ErrorHandler from "../error/ErrorHandler";

const CompanyService = (() => {
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
