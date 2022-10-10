import SpritesheetLocation from "../spritesheet/SpritesheetLocation";
import AssignedCitizenData from "./AssignedCitizenData";

interface CitizenAssignmentData {
    id: number;
    name: string;
    satisfactionModifier: number;
    xpWhenFinished: number;
    price: number;
    unlockedAtLevel: number;
    height: number;
    width: number;
    location: Location;
    buildableTypeEnum: number;
    spritesheetLocation: SpritesheetLocation;
    lastCollected: string;
    companyType: string;
    profitPerMinute: number;
    employeeMultiplier: number;
    maxAssignedCitizens: number;
    specialisationType: string;
    employees: Array<AssignedCitizenData>;
}

export default CitizenAssignmentData;
