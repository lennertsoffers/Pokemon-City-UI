import { TILE_DIMENSION } from "./Constants";

const Tile = ({ tileId }: { tileId: number }) => {
    const x = (tileId - 1) * -TILE_DIMENSION;

    return (
        <div
            className="tile"
            style={{
                backgroundPosition: `${x}px 0`,
                backgroundImage: "url('./assets/terrain_spritesheet.png')",
            }}
        ></div>
    );
};

export default Tile;
