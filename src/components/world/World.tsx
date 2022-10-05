import { useEffect, useRef, useState } from "react";
import MapDataType from "../../types/MapDataType";
import { CHUNK_PIXELS } from "./Constants";
import Layer from "./Layer";
import MapData from "./map";

const World = () => {
    const [worldData, setWorldData] = useState<MapDataType | null>(null);
    const world = useRef<any>(null);

    const mouseMoveHandler = (e: any) => {
        if (e.buttons !== 1) return;
        if (world.current == null) return;

        const worldElement = world.current;

        // We don't make a state because updating the state on every mouseMove event
        // is more demanding than reading the scroll position of the element
        const newX = worldElement.scrollLeft - e.movementX;
        const newY = worldElement.scrollTop - e.movementY;

        world.current.scrollTo(newX, newY);
    };

    useEffect(() => {
        setWorldData(MapData);

        if (world.current == null) return;
        if (worldData == null) return;

        const worldElement = world.current;
        worldElement.style.display = "block";
        worldElement.scrollTo((CHUNK_PIXELS * worldData.chunksX) / 2 - window.innerWidth / 2, (CHUNK_PIXELS * worldData.chunksY) / 2 - window.innerHeight / 2);
    }, [worldData]);

    const data: JSX.Element[] | String = (() => {
        if (worldData != null) return worldData.layers.map((layer, index) => <Layer key={index} layerData={layer} />);
        else return "Loading...";
    })();

    return (
        <div ref={world} onMouseMove={mouseMoveHandler} className="world">
            {data}
        </div>
    );
};

export default World;
