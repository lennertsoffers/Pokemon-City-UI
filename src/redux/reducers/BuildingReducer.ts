import BuildingDataType from "../../types/BuildingDataType";
import BuildingPlacementType from "../../types/BuildingPlacementType";
import BuildingStateType from "../../types/BuildingStateType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";

// const addBuilding = (layerId: number, { spritesheetLocation, spriteSheet, bottomRightPosition }: AddBuildingParamsType) => {
//     const dimension: SpritesheetDimensionType = SpritesheetUtils.getDimension(spritesheetLocation);

//     const topLeftPosition: PositionType = {
//         x: bottomRightPosition.x - (dimension.width - 1),
//         y: bottomRightPosition.y - (dimension.height - 1),
//     };

//     const bottomRightChunk: PositionType = {
//         x: Math.floor(bottomRightPosition.x / CHUNK_DIMENSION),
//         y: Math.floor(bottomRightPosition.y / CHUNK_DIMENSION),
//     };
//     const topLeftChunk: PositionType = {
//         x: Math.floor(topLeftPosition.x / CHUNK_DIMENSION),
//         y: Math.floor(topLeftPosition.y / CHUNK_DIMENSION),
//     };

//     const chunks = new Array<ChunkType>();

//     for (let chunkRow = topLeftChunk.y; chunkRow <= bottomRightChunk.y; chunkRow++) {
//         for (let chunkCol = topLeftChunk.x; chunkCol <= bottomRightChunk.x; chunkCol++) {
//             chunks.push({
//                 data: new Array<number>(),
//                 x: chunkCol * CHUNK_DIMENSION,
//                 y: chunkRow * CHUNK_DIMENSION,
//             });
//         }
//     }

//     chunks.forEach((chunk) => {
//         const chunkData = new Array<number>();

//         for (let row = chunk.y + (CHUNK_DIMENSION - 1); row >= chunk.y; row--) {
//             for (let col = chunk.x + (CHUNK_DIMENSION - 1); col >= chunk.x; col--) {
//                 if (row >= topLeftPosition.y && row <= bottomRightPosition.y && col >= topLeftPosition.x && col <= bottomRightPosition.x) {
//                     const yOffset = row - bottomRightPosition.y;
//                     const xOffset = col - bottomRightPosition.x;
//                     const index = spritesheetLocation.bottomRight + yOffset * TILES_IN_ROW + xOffset;

//                     chunkData.unshift(index);
//                 } else {
//                     chunkData.unshift(0);
//                 }
//             }
//         }

//         chunk.data = chunkData;
//     });

//     const layer: LayerType = {
//         chunks: chunks,
//         id: layerId,
//         spriteSheet: spriteSheet,
//     };

//     return layer;
// };

const BuildingReducer = (
    state: BuildingStateType = { buildingData: { companies: [], decorations: [], houses: [] }, buildingMap: [] },
    action: { type: ActionTypeEnum; data: BuildingDataType | BuildingPlacementType }
) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_BUILDING_DATA:
            return {
                ...state,
                buildingData: action.data,
            };

        case ActionTypeEnum.CREATE_BUILDING:
            console.log("create");

            const data = action.data as BuildingPlacementType;

            return {
                ...state,
                buildingMap: [...state.buildingMap, data],
            };
        default:
            return state;
    }
};

export default BuildingReducer;
