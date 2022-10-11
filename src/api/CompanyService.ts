import axios from "axios";

const CompanyService = (() => {
    const getCompaniesWithEmployees = async () => {
        try {
            const response = await axios.get("/api/companies");
            return response.data;
        } catch (error) {
            console.log(error);
        }
    };

    return {
        getCompaniesWithEmployees,
    };
})();

export default CompanyService;
