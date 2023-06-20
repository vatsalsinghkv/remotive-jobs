import styles from '../../styles/containers/Main.module.scss';

import {
  getJobsCategories,
  getJobsByCategory,
  getJobsPerPage,
} from '../../lib/api';
import SEO from '../../components/SEO';
import { getSeoData } from '../../lib/utils/portfolio';
import Hero from '../../containers/Hero';
import Filter from '../../containers/Filter';
import Jobs from '../../containers/Jobs';
import { getTotalPages } from '../../lib/utils/helper';

export const getServerSideProps = async (ctx) => {
  const { category } = ctx.params;
  const query = ctx.query?.search ?? '';
  const page = ctx.query?.page ?? 1;
  const location = ctx.query?.location ?? 'all';
  const fullTime = ctx.query?.fullTime;

  const { jobs, locations } = await getJobsByCategory(
    category,
    query,
    +fullTime,
    location
  );

  const categories = await getJobsCategories();
  const totalPages = getTotalPages(jobs.length);

  return {
    props: {
      jobs: getJobsPerPage(page, jobs),
      fullTime: +fullTime,
      currentPage: +page,
      search: query,
      totalPages,
      locations,
      location,
      categories,
      category,
    },
  };
};

export default function CategoryPage({
  jobs,
  categories,
  category,
  totalPages,
  currentPage,
  fullTime,
  locations,
  location,
  search,
}) {
  return (
    <>
      <SEO {...getSeoData()} />
      <Hero
        categories={categories}
        selectedCategory={category}
        search={search}
      />
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
