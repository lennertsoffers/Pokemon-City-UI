import SpecialisationData from "../../../../types/interfaces/citizens/SpecialisationData";
import ProgressBar from "./ProgressBar";

const SpecialisationDataView = ({ specialisationData, maxSpecialisationData }: { specialisationData: SpecialisationData; maxSpecialisationData: SpecialisationData }) => {
    return (
        <div>
            <div>Specialisation</div>
            <div>
                <div>
                    <div>COOKING</div>
                    <div>
                        <ProgressBar value={specialisationData.COOKING} max={maxSpecialisationData.COOKING} />
                    </div>
                </div>
                <div>
                    <div>SELLING</div>
                    <div>
                        <ProgressBar value={specialisationData.SELLING} max={maxSpecialisationData.SELLING} />
                    </div>
                </div>
                <div>
                    <div>SERVICE</div>
                    <div>
                        <ProgressBar value={specialisationData.SERVICE} max={maxSpecialisationData.SERVICE} />
                    </div>
                </div>
                <div>
                    <div>SOCIAL</div>
                    <div>
                        <ProgressBar value={specialisationData.SOCIAL} max={maxSpecialisationData.SOCIAL} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SpecialisationDataView;
