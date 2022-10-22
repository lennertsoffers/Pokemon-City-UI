import { useDispatch, useSelector } from "react-redux";
import BuildableService from "../../../api/BuildableService";
import CitizenService from "../../../api/CitizenService";
import { TILE_WIDTH, SPRITESHEET_WIDTH, CARD_IMAGE_MAX_WIDTH, CARD_IMAGE_MAX_HEIGHT } from "../../../config/config";
import { UPDATE_BUILDING } from "../../../redux/actions/BuildableDataActions";
import AssignedCitizenData from "../../../types/interfaces/citizens/AssignedCitizenData";
import CitizenAssignmentData from "../../../types/interfaces/citizens/CitizenAssignmentData";
import ResizeData from "../../../types/interfaces/spritesheet/ResizeData";
import SpritesheetDimension from "../../../types/interfaces/spritesheet/SpriteSheetDimension";
import CombinedState from "../../../types/interfaces/states/CombinedState";
import SpritesheetUtils from "../../../utils/SpritesheetUtils";
import CitizenCard from "../citizens/CitizenCard";

/** Component that displays data about a citizen */
const CitizenAssignmentCard = ({ citizenAssignmentData, updateCitizenAssignments }: { citizenAssignmentData: CitizenAssignmentData; updateCitizenAssignments: Function }) => {
    // Count the employees assinged to the company
    const amountOfEmployees = citizenAssignmentData.employees.length;
    // Count how many free employee spots there are
    const spacesAvailable = citizenAssignmentData.maxAssignedCitizens - amountOfEmployees;
    // Transforms the uppercase specialisationType name to a capitalized string
    const specialisationType = citizenAssignmentData.specialisationType.charAt(0) + citizenAssignmentData.specialisationType.substring(1).toLowerCase();

    const dispatch = useDispatch();
    const citizenId = useSelector((state: CombinedState) => state.citizenSelectorState.citizenId);

    /**
     * Handles a click on the company by assigning the selected citizen to this company
     */
    const handleClick = async () => {
        // Only assigns the citizen if there is a free spot and there is a citizen selected
        if (spacesAvailable <= 0) return;
        if (!citizenId) return;

        await CitizenService.assignCitizen(citizenId, citizenAssignmentData.id, updateCitizenAssignments);

        // Reloads the updated company so that the new amount of employees can be shown on hover
        dispatch(UPDATE_BUILDING(await BuildableService.getBuildableById(citizenAssignmentData.id)));
    };

    // Location on the spritesheet
    const location = citizenAssignmentData.spritesheetLocation;
    // Get the correct spritesheet for the type of the company
    const spritesheet = SpritesheetUtils.getCorrespondingSpritesheet("COMPANY", citizenAssignmentData.specialisationType);
    // Calculate the spritsheetDimenisons from the spritesheetLocation
    const dimensions: SpritesheetDimension = SpritesheetUtils.getDimension(location);
    // The width and height the sprite would be displayed on a not resized grid
    const displayWidth = dimensions.width * TILE_WIDTH;
    const displayHeight = dimensions.height * TILE_WIDTH;
    // Resize the grid data to dimensions smaller than CARD_IMAGE_MAX WIDTH and HEIGHT
    const resizeData: ResizeData = SpritesheetUtils.resizeToMaxWidthHeight(CARD_IMAGE_MAX_WIDTH, CARD_IMAGE_MAX_HEIGHT, displayWidth, displayHeight);
    // Get the background size for the spritesheet in the resized grid with the resizeFactor from the resizeData
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
