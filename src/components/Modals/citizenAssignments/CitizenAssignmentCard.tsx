import { useSelector } from "react-redux";
import CitizenService from "../../../api/CitizenService";
import DataLoader from "../../../api/DataLoader";
import { TILE_WIDTH, SPRITESHEET_WIDTH } from "../../../config/config";
import AssignedCitizenData from "../../../types/interfaces/citizens/AssignedCitizenData";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import ResizeData from "../../../types/interfaces/spritesheet/ResizeData";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import CitizenCard from "../citizens/CitizenCard";

const CitizenAssignmentCard = ({ citizenAssignmentData, updateCitizenAssignments }: { citizenAssignmentData: CitizenAssignmentData; updateCitizenAssignments: Function }) => {
    const amountOfEmployees = citizenAssignmentData.employees.length;
    const spacesAvailable = citizenAssignmentData.maxAssignedCitizens - amountOfEmployees;
    const specialisationType = citizenAssignmentData.specialisationType.charAt(0) + citizenAssignmentData.specialisationType.substring(1).toLowerCase();
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);

    const handleClick = async () => {
        if (spacesAvailable <= 0) return;
        if (citizenId) await CitizenService.assignCitizen(citizenId, citizenAssignmentData.id, updateCitizenAssignments);

        DataLoader.loadBuildables();
    };

    const location = citizenAssignmentData.spritesheetLocation;
    const spritesheet = SpritesheetUtils.getCorrespondingSpritesheet("COMPANY", citizenAssignmentData.specialisationType);
    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;

    const resizeData: ResizeData = SpritesheetUtils.resizeToMaxWidthHeight(130, 130, displayWidth, displayHeight);
    const adjustedBackgroundSize = resizeData.resizeFactor === 1 ? SPRITESHEET_WIDTH : SPRITESHEET_WIDTH / resizeData.resizeFactor;

    return (
        <div className="citizenAssignmentDataWrapper">
            <div className="companyData" onClick={handleClick}>
                <div className="companyData__image">
                    <div
                        style={{
                            height: `${resizeData.newHeight}px`,
                            width: `${resizeData.newWidth}px`,
                            backgroundImage: `url("./assets/spritesheets/${spritesheet}.png")`,
                            backgroundPosition: `${(-dimensions.offsetLeft / resizeData.resizeFactor) * TILE_WIDTH}px ${-dimensions.offsetTop / resizeData.resizeFactor}px`,
                            backgroundSize: `${adjustedBackgroundSize}px auto`,
                        }}
                    ></div>{" "}
                </div>
                <div>
                    <div className="companyData__name">{citizenAssignmentData.name}</div>
                    <div className="companyData__topic">
                        <div>Specialisation:</div>
                        <div>{specialisationType}</div>
                    </div>
                    <div className="companyData__topic">
                        <div>Employees:</div>
                        <div>
                            {amountOfEmployees}/{citizenAssignmentData.maxAssignedCitizens}
                        </div>
                    </div>
                </div>
            </div>
            <div className="employeeData">
                <div className="assignedCitizens">
                    {citizenAssignmentData.employees.map((assignedCitizenData: AssignedCitizenData) => (
                        <CitizenCard selected={citizenId === assignedCitizenData.id} citizenData={assignedCitizenData} key={assignedCitizenData.id} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CitizenAssignmentCard;
