import SubmissionsAllTemplate from '../../components/templates/SubmissionsAllTemplate';
import type { NextPage } from "next";
import withAuth from "../../auth/withAuth";

const AllSubmissions: NextPage = () => {
    return (
      <SubmissionsAllTemplate/>
    );
  };
  
  export default withAuth(AllSubmissions);
  