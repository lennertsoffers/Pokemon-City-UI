import SpecialisationData from "../types/interfaces/citizens/SpecialisationData";

/** Module containing util functions concerning citizens */
const CitizenUtils = (() => {
    /**
     * Calculates to total of max specialisation data
     * @param specialisationData The specialisation data of the citizen
     * @returns The total value of all the different specialisation data together
     */
    const totalSpecialisationData = (specialisationData: SpecialisationData) => {
        return specialisationData.COOKING + specialisationData.SELLING + specialisationData.SERVICE + specialisationData.SOCIAL;
    };

    return {
        totalSpecialisationData,
    };
})();

export default CitizenUtils;
