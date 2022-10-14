import BuildableData from "../types/interfaces/world/BuildableData";
import CompanyData from "../types/interfaces/world/CompanyData";
import HouseData from "../types/interfaces/world/HouseData";

const BuildableUtils = (() => {
    const getMinutesSinceLastCollection = (lastCollected: string) => {
        const milisecondsSinceLastCollection = new Date().getTime() - new Date(lastCollected).getTime();
        const minutesSinceLastCollection = Math.round(milisecondsSinceLastCollection / 1000 / 60);

        return minutesSinceLastCollection;
    };

    const getHouseRent = (buildableData: BuildableData) => {
        if (buildableData.buildableTypeEnum !== "HOUSE") return 0;

        const houseData = buildableData as HouseData;
        return Math.min(BuildableUtils.getMinutesSinceLastCollection(houseData.lastCollected) * houseData.rentPerMinute, houseData.maxRent);
    };

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
