import BuildableData from "../types/interfaces/world/BuildableData";
import CompanyData from "../types/interfaces/world/CompanyData";
import HouseData from "../types/interfaces/world/HouseData";

/** Module containing util functions concerning buildables */
const BuildableUtils = (() => {
    /**
     * Calculates the minutes since the time the building was last collected
     */
    const getMinutesSinceLastCollection = (lastCollected: string) => {
        // Get difference in milliseconds by subtratcting the epoch differences
        const milisecondsSinceLastCollection = new Date().getTime() - new Date(lastCollected).getTime();
        // Convert the milliseconds to minutes
        const minutesSinceLastCollection = Math.round(milisecondsSinceLastCollection / 1000 / 60);

        return minutesSinceLastCollection;
    };

    /**
     * Calculates the accumulated rent generated since the last collection
     */
    const getHouseRent = (buildableData: BuildableData) => {
        if (buildableData.buildableTypeEnum !== "HOUSE") return 0;

        const houseData = buildableData as HouseData;
        return Math.min(BuildableUtils.getMinutesSinceLastCollection(houseData.lastCollected) * houseData.rentPerMinute, houseData.maxRent);
    };

    /**
     * Calculates the accumulated profit generated since the last collection
     */
    const getCompanyProfit = (buildableData: BuildableData) => {
        if (buildableData.buildableTypeEnum !== "COMPANY") return 0;

        const companyData = buildableData as CompanyData;
        return BuildableUtils.getMinutesSinceLastCollection(companyData.lastCollected) * companyData.incomePerMinute;
    };

    return {
        getMinutesSinceLastCollection,
        getHouseRent,
        getCompanyProfit,
    };
})();

export default BuildableUtils;
