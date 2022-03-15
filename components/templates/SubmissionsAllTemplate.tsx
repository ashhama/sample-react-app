import BaseTemplate from "./BaseTemplate";
import BaseContainer from "../layouts/BaseContainer";
import Heading from "../elements/Heading";
import SubmissionsTable from "../modules/SubmissionsTable";
import BottomNavLayout from "../layouts/BottomNavLayout";
import BottomNavSubmissionAll from "../elements/BottomNavSubmissionAll";
import BottomNavSubmissionSingle from "../elements/BottomNavSubmissionSingle";
import BottomNavSubmissionNew from "../elements/BottomNavSubmissionNew";

const LoginTemplate: React.FC<{}> = (props) => {
  return (
    <>  
    <BaseTemplate>
    <div className="bg-site-gray-100 flex">
      <BaseContainer>
        <Heading heading="All Submissions"/>
        <SubmissionsTable />
      </BaseContainer>
    </div>
    </BaseTemplate>
    <BottomNavLayout>
      <BottomNavSubmissionNew />
    </BottomNavLayout>
    </>
  );
};

export default LoginTemplate;
