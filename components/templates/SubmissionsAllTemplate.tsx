/**
 * View All form submissions from this page
 *
 */

import BaseTemplate from "./BaseTemplate";
import BaseContainer from "../layouts/BaseContainer";
import Heading from "../elements/Heading";
import SubmissionsTable from "../modules/SubmissionsTable";


const SubmissionsAllTemplate: React.FC<{}> = (props) => {
  return (
    <>
      <BaseTemplate>
        <div className="bg-site-gray-100 flex">
          <BaseContainer>
            <Heading heading="All Submissions" />
            <SubmissionsTable />
          </BaseContainer>
        </div>
      </BaseTemplate>

     
    </>
  );
};

export default SubmissionsAllTemplate;
