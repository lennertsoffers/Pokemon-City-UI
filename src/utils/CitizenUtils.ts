import SpecialisationData from "../types/interfaces/citizens/SpecialisationData";

const CitizenUtils = (() => {
    const totalSpecialisationData = (specialisationData: SpecialisationData) => {
        return specialisationData.COOKING + specialisationData.SELLING + specialisationData.SERVICE + specialisationData.SOCIAL;
    };

    return {
        totalSpecialisationData,
    };
})();

export default CitizenUtils;
