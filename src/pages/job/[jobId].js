import Job from '../../containers/Job';
import { getJobById } from '../../lib/api';

export const getServerSideProps = async (ctx) => {
  const { jobId } = ctx.params;
  const job = await getJobById(jobId);

  return {
    props: { job },
  };
};

export default function JobPage({ job }) {
  if (!job) return <h1>Not Found</h1>;
  return <Job {...job} />;
}
