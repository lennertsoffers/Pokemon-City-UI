import CompanyData from "../../types/interfaces/world/CompanyData";
import CompanyInfoData from "../../types/interfaces/world/CompanyInfoData";
import HouseData from "../../types/interfaces/world/HouseData";
import HouseInfoData from "../../types/interfaces/world/HouseInfoData";
import BuildableUtils from "../BuildableUtils";

/**
 * Mapper that contains functions to map data to their info
 */
const BuildableInfoMapper = (() => {
    /**
     * Maps {@link HouseData} to {@link HouseInfoData}
     * @param houseData The house data to be mapped
     * @returns The mapped houseInfoData
     */
    const toHouseInfo = (houseData: HouseData): HouseInfoData => {
        return {
            id: houseData.id,
            name: houseData.name,
            numberOfCitizens: houseData.numberOfCitizens,
            maxRent: houseData.maxRent,
            rent: BuildableUtils.getHouseRent(houseData),
        };
    };

    /**
     * Maps {@link CompanyData} to {@link CompanyInfoData}
     * @param companyData The company data to be mapped
     * @returns The mapped companyInfoData
     */
    const toCompanyInfo = (companyData: CompanyData): CompanyInfoData => {
        return {
            id: companyData.id,
            name: companyData.name,
            specialisationType: companyData.specialisationType,
            employeeMultiplier: companyData.employeeMultiplier,
            assignedCitizens: companyData.assignedCitizens,
            maxAssignedCitizens: companyData.maxAssignedCitizens,
            profit: BuildableUtils.getCompanyProfit(companyData),
        };
    };

    return {
        toHouseInfo,
        toCompanyInfo,
    };
})();

export default BuildableInfoMapper;
