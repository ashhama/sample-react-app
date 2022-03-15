import AllSubmissionsTemplate from '../../components/templates/SubmissionsAllTemplate';
import type { NextPage } from "next";
import withAuth from "../../auth/withAuth";

const AllSubmissions: NextPage = () => {
    return (
      <AllSubmissionsTemplate/>
    );
  };
  
  export default withAuth(AllSubmissions);
  