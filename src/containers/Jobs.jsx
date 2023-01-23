import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import JobItem from '../components/JobItem';
import Pagination from '../components/Pagination';
import Error from '../components/UI/Error';
import { getJobsPerPage } from '../lib/api';
import { getTotalPages, timeFormatter } from '../lib/utils/helper';
import { setTotalPages } from '../store/pagination';
import styles from '../styles/containers/Jobs.module.scss';

const Jobs = ({ className }) => {
  const dispatch = useDispatch();
  const allJobs = useSelector((state) => state.jobs.filtered);

  const category = useSelector((state) => state.jobs.categories.selected);
  const currentPage = useSelector((state) => state.pagination.currentPage);

  useEffect(() => {
    dispatch(setTotalPages(getTotalPages(allJobs.length || 1)));
  }, [dispatch, allJobs, category]);

  const jobs = getJobsPerPage(currentPage, allJobs);
  const classes = `${styles['jobs']} ${className}`;

  if (!allJobs.length) {
    return <Error message="Oops!... No results found" />;
  }

  return (
    <ul className={classes}>
      {jobs.map((job) => (
        <JobItem
          key={job.id}
          id={job.id}
          title={job.title}
          name={job.company_name}
          logo={job.company_logo}
          type={job.job_type}
          date={timeFormatter(job.publication_date)}
          location={job.candidate_required_location}
          salary={job.salary}
          category={job.category}
        />
      ))}
      <Pagination />
    </ul>
  );
};

export default Jobs;
