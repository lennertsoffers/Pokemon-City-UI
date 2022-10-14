import { useState } from "react";
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

const Buildable = ({ buildableData }: { buildableData: BuildableData }) => {
    const { selectedBuildable, id } = useSelector((state: CombinedState) => state.buildableSelectorState);
    const action = useSelector((state: CombinedState) => state.selectedActionState.selectedAction);
    const dispatch = useDispatch();
    const [houseInfo, setHouseInfo] = useState<HouseInfoData | null>(null);
    const [companyInfo, setCompanyInfo] = useState<CompanyInfoData | null>(null);

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

    const handleBuildableMouseEnter = () => {
        switch (buildableData.buildableTypeEnum) {
            case "HOUSE":
                return setHouseInfo(BuildableInfoMapper.toHouseInfo(buildableData as HouseData));
            case "COMPANY":
                return setCompanyInfo(BuildableInfoMapper.toCompanyInfo(buildableData as CompanyData));
        }
    };

    const handleBuildableMouseLeave = () => {
        setHouseInfo(null);
        setCompanyInfo(null);
    };

    const handleDemolish = () => {
        if (buildableData.buildableTypeEnum === "HOUSE") {
            dispatch(SELECT_BUILDING(BuildableDataMapper.toStaticBuildableData(buildableData), buildableData.id));
            dispatch(OPEN_MODAL(ModalTypeEnum.SELECT_CITIZEN_TO_DEMOLISH_MODAL));
        } else {
            BuildableService.demolishBuildable(
                buildableData.id,
                () => {
                    dispatch(DEMOLISH_BUILDING(buildableData.id));
                    DataLoader.loadUserData();
                },
                () => {
                    dispatch(DESELECT_BUILDING);
                }
            );
        }
    };

    const handleMove = () => {
        dispatch(SELECT_BUILDING({ ...buildableData, type: buildableData.buildableTypeEnum }, buildableData.id));
    };

    const handleCollect = () => {
        if (buildableData.buildableTypeEnum !== "HOUSE" && buildableData.buildableTypeEnum !== "COMPANY") return;

        const incomeBuildingData: IncomeBuildingData = buildableData as IncomeBuildingData;
        const minutesSinceLastCollection = BuildableUtils.getMinutesSinceLastCollection(incomeBuildingData.lastCollected);

        if (buildableData.buildableTypeEnum === "HOUSE" && BuildableUtils.getHouseRent(buildableData) < (buildableData as HouseData).maxRent / 2) return;
        if (buildableData.buildableTypeEnum === "COMPANY" && minutesSinceLastCollection < 1) return;

        IncomeBuildingService.collect(incomeBuildingData.id, () => {
            DataLoader.updateBuildable(incomeBuildingData.id);
            DataLoader.loadUserData();
        });
    };

    const pointerEvents = selectedBuildable ? "none" : "all";

    const location = buildableData.spritesheetLocation;
    const spritesheet = buildableData.spritesheet ? buildableData.spritesheet : FALLBACK_SPRITESHEET;

    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const worldPosition: Position = buildableData.location;

    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

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
                }}
            >
                {displayMoveOverlay && (
                    <div
                        style={{
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
                    transform: `translate(${worldPosition.x * TILE_WIDTH - displayWidth / 2 + TILE_WIDTH - 100}px, ${worldPosition.y * TILE_WIDTH + TILE_WIDTH - displayHeight - 100}px)`,
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
