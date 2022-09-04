import Hero from '../../containers/Hero';
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
    revalidate: REVALIDATE_TIME,
  };
});

export default function CategoryPage() {
  return (
    <>
      <Hero />
      <Main />
    </>
  );
}
