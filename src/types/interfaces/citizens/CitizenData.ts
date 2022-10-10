import SpecialisationData from "./SpecialisationData";

interface CitizenData {
    id: number;
    name: string;
    levelSpeed: number;
    assignedSince: string;
    specialisationData: SpecialisationData;
    maxSpecialisationData: SpecialisationData;
}

export default CitizenData;
