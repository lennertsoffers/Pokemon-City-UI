import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import DataLoader from "../../../api/DataLoader";
import IncomeBuildingService from "../../../api/IncomeBuildingService";
import { FALLBACK_SPRITESHEET, TILE_WIDTH } from "../../../config/config";
import { DEMOLISH_BUILDING } from "../../../redux/actions/BuildableDataActions";
import { DESELECT_BUILDING, SELECT_BUILDING } from "../../../redux/actions/BuildableSelectorActions";
import { OPEN_MODAL } from "../../../redux/actions/ModalActions";
import ActionEnum from "../../../types/enums/ActionEnum";
import ModalTypeEnum from "../../../types/enums/ModalTypeEnum";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import BuildableData from "../../../types/interfaces/world/BuildableData";
import CompanyData from "../../../types/interfaces/world/CompanyData";
import CompanyInfoData from "../../../types/interfaces/world/CompanyInfoData";
import HouseData from "../../../types/interfaces/world/HouseData";
import HouseInfoData from "../../../types/interfaces/world/HouseInfoData";
import IncomeBuildingData from "../../../types/interfaces/world/IncomeBuildingData";
import Position from "../../../types/interfaces/world/Position";
import BuildableUtils from "../../../utils/BuildableUtils";
import BuildableDataMapper from "../../../utils/mappers/BuildableDataMapper";
import BuildableInfoMapper from "../../../utils/mappers/BuildableInfoMapper";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import CompanyInfo from "./CompanyInfo";
import HouseInfo from "./HouseInfo";

/**
 * Component that displays a buildable in the world
 * -> Buildables with a higher y position get a higher z-index to be shown in front
 * -> Hovering incomeBuildings shows their current accumulated profit info
 */
const Buildable = ({ buildableData }: { buildableData: BuildableData }) => {
    const { selectedBuildable, id } = useSelector((state: CombinedState) => state.buildableSelectorState);
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const dispatch = useDispatch();
    const [houseInfo, setHouseInfo] = useState<HouseInfoData | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfoData | null>(null);

    /**
     * Handles clicking a buildable in the world
     * Calls the right function per selected action
     */
    const handleBuildableClick = () => {
        switch (action) {
            case ActionEnum.DEMOLISH:
                return handleDemolish();
            case ActionEnum.MOVE:
                return handleMove();
            case ActionEnum.NONE:
                return handleCollect();
        }
    };

    /**
     * Handles entering the building with the mouse
     * If there is no action selected, show the buildable info
     */
    const handleBuildableMouseEnter = () => {
        if (action === ActionEnum.NONE) setInfo();
    };

    /**
     * Sets the right info dialog for the type of building
     */
    const setInfo = () => {
        switch (buildableData.buildableTypeEnum) {
            case "HOUSE":
                return setHouseInfo(BuildableInfoMapper.toHouseInfo(buildableData as HouseData));
            case "COMPANY":
                return setCompanyInfo(BuildableInfoMapper.toCompanyInfo(buildableData as CompanyData));
        }
    };

    /**
     * Hides the info dialog on leaving the building with the mouse
     */
    const handleBuildableMouseLeave = () => {
        setHouseInfo(null);
        setCompanyInfo(null);
    };

    /**
     * Calls the demolish function from the {@link BuildableService}
     * If the type of the buildable is a house, opens the modal to select citizens to remove too
     */
    const handleDemolish = () => {
        // If the type of the buildable is a house, select the buildable and open the citizen removal modal
        if (buildableData.buildableTypeEnum === "HOUSE") {
            dispatch(SELECT_BUILDING(BuildableDataMapper.toStaticBuildableData(buildableData), buildableData.id));
            dispatch(OPEN_MODAL(ModalTypeEnum.SELECT_CITIZEN_TO_DEMOLISH_MODAL));
        }

        // Call the BuildalbeService otherwise
        else {
            BuildableService.demolishBuildable(
                buildableData.id,
                () => {
                    // On success we also remove the buildable from the state
                    dispatch(DEMOLISH_BUILDING(buildableData.id));
                    // The user data gets refreshed
                    DataLoader.loadUserData();
                },
                () => {
                    // Always deselect the building
                    dispatch(DESELECT_BUILDING);
                }
            );
        }
    };

    /**
     * Selects the building so that the correct building outline can be show in the world
     */
    const handleMove = () => {
        dispatch(SELECT_BUILDING({ ...buildableData, type: buildableData.buildableTypeEnum }, buildableData.id));
    };

    /**
     * Checks if the buildable is ready for collection
     * If this is the case, collects the money by calling the {@link IncomeBuildingService}
     */
    const handleCollect = () => {
        // Only houses and companies can be collected
        if (buildableData.buildableTypeEnum !== "HOUSE" && buildableData.buildableTypeEnum !== "COMPANY") return;

        // Calculate how many minutes since the last collection
        const incomeBuildingData: IncomeBuildingData = buildableData as IncomeBuildingData;
        const minutesSinceLastCollection = BuildableUtils.getMinutesSinceLastCollection(incomeBuildingData.lastCollected);

        // The accumulated income has to be more than half the max for houses
        if (buildableData.buildableTypeEnum === "HOUSE" && BuildableUtils.getHouseRent(buildableData) < (buildableData as HouseData).maxRent / 2) return;
        // You can collect companies only oncee a minute
        if (buildableData.buildableTypeEnum === "COMPANY" && minutesSinceLastCollection < 1) return;

        // Collect the money
        // Updated the buildable data and user data if the collection was a success
        IncomeBuildingService.collect(incomeBuildingData.id, () => {
            DataLoader.updateBuildable(incomeBuildingData.id);
            DataLoader.loadUserData();
        });
    };

    // Update the info modal if the buildableData changes
    // For example the amount of employees in a company
    useEffect(() => {
        if (houseInfo || companyInfo) setInfo();
    }, [buildableData]);

    // The user should be able to click through the buildable if he/she is placing a road, building, or moving a buildable
    const pointerEvents = selectedBuildable || action === ActionEnum.PLACE_ROAD ? "none" : "all";

    // Create the buildable image on the grid
    const location = buildableData.spritesheetLocation;
    const spritesheet = buildableData.spritesheet ? buildableData.spritesheet : FALLBACK_SPRITESHEET;
    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const worldPosition: Position = buildableData.location;
    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

    // Only display the move overlay (blue indicator that the user is moving this building) when the action is move and there is a building selected by id
    const displayMoveOverlay = action === ActionEnum.MOVE && selectedBuildable !== null && id === buildableData.id;

    return (
        <div>
            <div
                onClick={handleBuildableClick}
                onMouseEnter={handleBuildableMouseEnter}
                onMouseLeave={handleBuildableMouseLeave}
                style={{
                    backgroundPosition: `${-dimensions.offsetLeft * TILE_WIDTH}px ${-dimensions.offsetTop}px`,
                    backgroundImage: `url(./assets/spritesheets/${spritesheet}.png)`,
                    transform: `translate(${worldPosition.x * TILE_WIDTH - displayWidth + TILE_WIDTH}px, ${worldPosition.y * TILE_WIDTH - displayHeight + TILE_WIDTH}px)`,
                    width: `${displayWidth}px`,
                    height: `${displayHeight}px`,
                    position: `absolute`,
                    left: `50%`,
                    top: `50%`,
                    display: `flex`,
                    flexDirection: `column`,
                    justifyContent: `end`,
                    alignItems: `center`,
                    pointerEvents: pointerEvents,
                    zIndex: `${200 + worldPosition.y}`,
                }}
            >
                {displayMoveOverlay && (
                    <div
                        style={{
                            zIndex: 800,
                            position: "relative",
                            border: `4px dashed rgba(0, 0, 150, 0.8)`,
                            backgroundColor: `rgba(0, 0, 255, 0.3)`,
                            height: `${selectedBuildable.height * TILE_WIDTH}px`,
                            width: `${selectedBuildable.width * TILE_WIDTH}px`,
                        }}
                    />
                )}
            </div>
            <div
                className="buildableInfoWrapper"
                style={{
                    transform: `translate(${worldPosition.x * TILE_WIDTH - displayWidth / 2 + TILE_WIDTH - 125}px, ${worldPosition.y * TILE_WIDTH + TILE_WIDTH - displayHeight - 100}px)`,
                    position: `absolute`,
                    left: `50%`,
                    top: `50%`,
                }}
            >
                {houseInfo && <HouseInfo houseInfo={houseInfo} />}
                {companyInfo && <CompanyInfo companyInfo={companyInfo} />}
            </div>
        </div>
    );
};

export default Buildable;
