import BuildableData from "./BuildableData";

interface IncomeBuildingData extends BuildableData {
    lastCollected: string;
    incomePerMinute: number;
}

export default IncomeBuildingData;
