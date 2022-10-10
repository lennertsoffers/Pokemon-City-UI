import CitizenData from "./CitizenData";

interface AssignedCitizenData extends CitizenData {
    companyId: number;
    companyName: string;
}

export default AssignedCitizenData;
