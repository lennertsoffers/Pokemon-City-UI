import CompanyInfoData from "../../../types/interfaces/world/CompanyInfoData";
import StringUtils from "../../../utils/StringUtils";
import ProgressBar from "../../shared/ProgressBar";

/**
 * Component that shows a brief info about the company
 * -> How much money is already accumulated
 * -> n/x citizens assigned
 */
const CompanyInfo = ({ companyInfo }: { companyInfo: CompanyInfoData }) => {
    const profit = Math.round(companyInfo.profit);

    return (
        <div className="buildableInfo companyInfo">
            <div className="buildableInfo--background">
                <img src="./assets/ui/text_balloon.png" alt="text balloon" />
            </div>
            <div className="buildableInfo--foreground">
                <div>
                    <div className="companyInfo__name">{companyInfo.name}</div>
                    <ProgressBar value={profit} max={profit} displayMaxValue={true} hasMaxValue={false} />
                    <div className="companyInfo__employees">
                        {StringUtils.simplify(companyInfo.assignedCitizens)}/{StringUtils.simplify(companyInfo.maxAssignedCitizens)}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CompanyInfo;
