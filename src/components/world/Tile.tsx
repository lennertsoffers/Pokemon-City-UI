import { TILE_DIMENSION } from "./Constants";

const Tile = ({ tileId, tileIndex, chunkPosition, layerId }: { tileId: number; tileIndex: number; chunkPosition: { x: number; y: number }; layerId: number }) => {
    const x = (tileId - 1) * -TILE_DIMENSION;

    const tileClickHandler = () => {
        console.log({
            layer: layerId,
            chunk: chunkPosition,
            tile: tileIndex,
        });
    };

    return (
        <div
            onClick={tileClickHandler}
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: "url('./assets/terrain_spritesheet.png')",
            }}
        ></div>
    );
};

export default Tile;
