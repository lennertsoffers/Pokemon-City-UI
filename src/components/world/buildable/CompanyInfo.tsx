import CompanyInfoData from "../../../types/interfaces/world/CompanyInfoData";
import ProgressBar from "../../shared/ProgressBar";

const CompanyInfo = ({ companyInfo }: { companyInfo: CompanyInfoData }) => {
    return (
        <div className="buildableInfo companyInfo">
            <div className="buildableInfo--background">
                <img src="./assets/ui/text_balloon.png" alt="text balloon" />
            </div>
            <div className="buildableInfo--foreground">
                <div>
                    <div className="companyInfo__name">{companyInfo.name}</div>
                    <ProgressBar value={companyInfo.profit} max={companyInfo.profit} displayMaxValue={true} />
                    <div className="companyInfo__employees">
                        {companyInfo.assignedCitizens}/{companyInfo.maxAssignedCitizens}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
