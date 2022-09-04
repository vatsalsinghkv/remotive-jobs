import Job from '../../containers/Job';
import { REVALIDATE_TIME } from '../../lib/utils/constant';
import { getAllJobs, getJobById } from '../../lib/api';

/*
 * Fallback 'false' would not generate pages for the jobId which is not listed above
 *
 * Fallback 'true' would generate page for jobId which is not listed above, they'd be a valid value
 * But they're not pre-generated they're generated when request reaches that path,
 * so you need to return loader (fallback state) when data isn't available in the component page
 * This gives us pre-generation for frequently visited pages and postponed-generation for least visited pages
 *
 * Fallback 'blocking' would block the page until data is available, so you wouldn't need to return loader (fallback state)
 */

/* export const getStaticPaths = async () => {
  const jobs = await getAllJobs();

  return {
    paths: jobs.map((job) => ({ params: { jobId: job.id.toString() } })),
    fallback: true,
  };
}; */

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
