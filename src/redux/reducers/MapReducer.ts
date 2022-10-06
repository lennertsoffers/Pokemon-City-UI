import { TILES_IN_ROW } from "../../config";
import ChunkType from "../../types/ChunkType";
import ActionTypeEnum from "../../types/enums/ActionTypeEnum";
import MapDataType from "../../types/MapDataType";
import SpritesheetDimensionType from "../../types/SpriteSheetDimensionType";
import SpritesheetLocationType from "../../types/SpritesheetLocationType";

const addBuilding = () => {
    const houseData: SpritesheetLocationType = {
        topLeft: 144,
        bottomRight: 1932,
    };
    const dimension: SpritesheetDimensionType = getDimension(houseData);

    const bottomRightPosition = {
        x: 1,
        y: 5,
    };
    const topLeftPosition = {
        x: bottomRightPosition.x - (dimension.width - 1),
        y: bottomRightPosition.y - (dimension.height - 1),
    };

    const bottomRightChunk = {
        x: Math.floor(bottomRightPosition.x / 16),
        y: Math.floor(bottomRightPosition.y / 16),
    };
    const topLeftChunk = {
        x: Math.floor(topLeftPosition.x / 16),
        y: Math.floor(topLeftPosition.y / 16),
    };
    const chunkRows = bottomRightChunk.y - topLeftChunk.y + 1;
    const chunkCols = bottomRightChunk.x - topLeftChunk.x + 1;

    const chunks = new Array<ChunkType>();

    for (let chunkRow = topLeftChunk.y; chunkRow <= bottomRightChunk.y; chunkRow++) {
        for (let chunkCol = topLeftChunk.x; chunkCol <= bottomRightChunk.x; chunkCol++) {
            chunks.push({
                data: new Array<number>(),
                x: chunkCol * 16,
                y: chunkRow * 16,
            });
        }
    }

    chunks.forEach((chunk) => {
        const chunkData = new Array<number>();

        for (let row = chunk.y + 15; row >= chunk.y; row--) {
            for (let col = chunk.x + 15; col >= chunk.x; col--) {
                if (row >= topLeftPosition.y && row <= bottomRightPosition.y && col >= topLeftPosition.x && col <= bottomRightPosition.x) {
                    const yOffset = row - bottomRightPosition.y;
                    const xOffset = col - bottomRightPosition.x;
                    const index = houseData.bottomRight + yOffset * 8 + xOffset;

                    chunkData.unshift(index);
                } else {
                    chunkData.unshift(0);
                }
            }
        }

        chunk.data = chunkData;
    });

    return {};
};

const getDimension = (spritesheetLocation: SpritesheetLocationType) => {
    // Offset from the most left tile of the spritesheet
    const offset = spritesheetLocation.topLeft % TILES_IN_ROW;

    // Width is the difference between the top left tile and the bottom right divided by tiles in a row plus 1
    const width = ((spritesheetLocation.bottomRight - spritesheetLocation.topLeft) % 8) + 1;
    const height = Math.floor((spritesheetLocation.bottomRight - spritesheetLocation.topLeft) / 8) + 1;

    return {
        width: width,
        height: height,
        offset: offset,
    };
};

const MapReducer = (state: MapDataType | null = null, action: any) => {
    switch (action.type) {
        case ActionTypeEnum.LOAD_MAP_DATA:
            return {
                ...state,
                chunksX: action.data.chunksX,
                chunksY: action.data.chunksY,
                layers: action.data.layers,
            };
        case ActionTypeEnum.CREATE_BUILDING:
            addBuilding();

            return state;
        default:
            return state;
    }
};

export default MapReducer;
