import styles from '../styles/containers/Main.module.scss';

import { getAllJobs, getJobsCategories, getJobsPerPage } from '../lib/api';
import { getSeoData } from '../lib/utils/portfolio';

import SEO from '../components/SEO';
import Hero from '../containers/Hero';
import Filter from '../containers/Filter';
import Jobs from '../containers/Jobs';
import { getTotalPages } from '../lib/utils/helper';

export const getServerSideProps = async (ctx) => {
  const query = ctx.query?.search ?? '';
  const page = ctx.query?.page ?? 1;
  const location = ctx.query?.location ?? 'all';
  const fullTime = ctx.query?.fullTime;

  const { jobs, locations } = await getAllJobs(query, +fullTime, location);

  const categories = await getJobsCategories();
  const totalPages = getTotalPages(jobs.length);

  return {
    props: {
      jobs: getJobsPerPage(page, jobs),
      currentPage: +page,
      categories,
      totalPages,
      locations,
      location,
      search: query,
      fullTime: +fullTime,
    },
  };
};

export default function Home({
  jobs,
  categories,
  totalPages,
  currentPage,
  locations,
  location,
  fullTime,
  search,
}) {
  return (
    <>
      <SEO {...getSeoData()} />
      <Hero categories={categories} search={search} />
      <main className={styles['main']}>
        <Filter
          className={styles['main__aside']}
          fullTime={fullTime}
          selectedLocation={location}
          locations={locations}
        />
        <Jobs
          className={styles['main__jobs']}
          {...{ jobs, totalPages, currentPage }}
        />
      </main>
    </>
  );
}
