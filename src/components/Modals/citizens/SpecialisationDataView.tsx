import SpecialisationData from "../../../types/interfaces/citizens/SpecialisationData";
import ProgressBar from "../../shared/ProgressBar";

/** Component that displays the specialisation data of the citizen in a format with {@link ProgressBar} */
const SpecialisationDataView = ({ specialisationData, maxSpecialisationData }: { specialisationData: SpecialisationData; maxSpecialisationData: SpecialisationData }) => {
    return (
        <div className="specialisationDataView">
            <div>
                <div className="specialisationDataView__topic">
                    <div>Cooking</div>
                    <div>
                        <ProgressBar value={specialisationData.COOKING} max={maxSpecialisationData.COOKING} />
                    </div>
                </div>
                <div className="specialisationDataView__topic">
                    <div>Selling</div>
                    <div>
                        <ProgressBar value={specialisationData.SELLING} max={maxSpecialisationData.SELLING} />
                    </div>
                </div>
                <div className="specialisationDataView__topic">
                    <div>Service</div>
                    <div>
                        <ProgressBar value={specialisationData.SERVICE} max={maxSpecialisationData.SERVICE} />
                    </div>
                </div>
                <div className="specialisationDataView__topic">
                    <div>Social</div>
                    <div>
                        <ProgressBar value={specialisationData.SOCIAL} max={maxSpecialisationData.SOCIAL} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialisationDataView;
