import SEO from '../../components/SEO';
import Job from '../../containers/Job';
import { getJobById } from '../../lib/api';
import { getJobSeoData } from '../../lib/utils/portfolio';

export const getServerSideProps = async (ctx) => {
  const { jobId } = ctx.params;
  const job = await getJobById(jobId);

  return {
    props: { job },
  };
};

export default function JobPage({ job }) {
  if (!job) return <h1>Not Found</h1>;
  return (
    <>
      <SEO
        {...getJobSeoData({
          name: job.title,
          company: job.company_name,
          category: job.category,
          salary: job?.salary,
          location: job.candidate_required_location,
        })}
      />
      <Job {...job} />
    </>
  );
}
