import AllSubmissionsTemplate from '../../components/templates/SubmissionsAllTemplate';
import type { NextPage } from "next";
import withAuth from "../../auth/withAuth";
import { useRouter } from 'next/router';
import SubmissionSingleTemplate from '../../components/templates/SubmissionSingleTemplate';

const SingleSubmission: NextPage = () => {
  const router = useRouter();
    const documentId = router.query.submissionId as string;

    return (
      <SubmissionSingleTemplate documentId={documentId} />
    );
  };
  
  export default withAuth(SingleSubmission);