import { useDispatch } from "react-redux";
import { COOKING_SPRITESHEET, SELLING_SPRITESHEET, SERVICE_SPRITESHEET, SOCIAL_SPRITESHEET } from "../../../../config/config";
import { SELECT_BUILDING } from "../../../../redux/actions/BuildableSelectorActions";
import { CLOSE_MODAL } from "../../../../redux/actions/ModalActions";
import StaticCompanyData from "../../../../types/interfaces/static/StaticCompanyData";

const CompanyDataCard = ({ companyData }: { companyData: StaticCompanyData }) => {
    const dispatch = useDispatch();

    const handleClick = () => {
        switch (companyData.specialisationType) {
            case "COOKING":
                companyData.spritesheet = COOKING_SPRITESHEET;
                break;
            case "SELLING":
                companyData.spritesheet = SELLING_SPRITESHEET;
                break;
            case "SERVICE":
                companyData.spritesheet = SERVICE_SPRITESHEET;
                break;
            case "SOCIAL":
                companyData.spritesheet = SOCIAL_SPRITESHEET;
                break;
        }

        dispatch(SELECT_BUILDING(companyData));
        dispatch(CLOSE_MODAL);
    };

    return (
        <div className="buildingCard" onClick={handleClick}>
            <div>
                <img src={"./assets/images/companies/" + companyData.name.replaceAll(/[ -]/gi, "_").replaceAll("'", "").toUpperCase() + ".png"} alt="company" />
            </div>
            <div>{companyData.name}</div>
            <div>€{companyData.price}</div>
            <div>{companyData.profitPerMinute} €/min</div>
            <div>{companyData.specialisationType}</div>
            <div>{companyData.maxAssignedCitizens}</div>
            <div>{companyData.xpWhenFinished}XP</div>
            <div>{companyData.unlockedAtLevel}</div>
            <div>
                {companyData.width}x{companyData.height}
            </div>
        </div>
    );
};

export default CompanyDataCard;
