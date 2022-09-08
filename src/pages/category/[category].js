import Main from '../../containers/Main';
import { REVALIDATE_TIME } from '../../lib/utils/constant';
import { wrapper } from '../../store';
import {
  getJobsCategories,
  getJobsByCategory,
  getLocations,
} from '../../lib/api';
import {
  setCategories,
  setJobs,
  setLocations,
  setSelectedCategory,
} from '../../store/jobs';
import { getTotalPages } from '../../lib/utils/helper';
import { setTotalPages } from '../../store/pagination';
import SEO from '../../components/SEO';
import { getSeoData } from '../../potfolio';

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

export const getStaticPaths = async () => {
  const categories = await getJobsCategories();

  return {
    paths: categories.map((category) => ({ params: { category } })),
    fallback: false,
  };
};

export const getStaticProps = wrapper.getStaticProps((store) => async (ctx) => {
  const { category } = ctx.params;
  store.dispatch(setSelectedCategory(category));

  const jobs = await getJobsByCategory(category);
  store.dispatch(setJobs(jobs));

  store.dispatch(setTotalPages(getTotalPages(jobs.length)));

  if (!store.getState().jobs.categories.all.length) {
    const categories = await getJobsCategories();
    store.dispatch(setCategories(categories));
  }

  if (!store.getState().jobs.locations.all.length) {
    const locations = await getLocations(category);
    store.dispatch(setLocations(locations));
  }

  return {
    props: { category },
    revalidate: REVALIDATE_TIME,
  };
});

export default function CategoryPage({ category }) {
  return (
    <>
      <SEO {...getSeoData(category)} />
      <Main />
    </>
  );
}
