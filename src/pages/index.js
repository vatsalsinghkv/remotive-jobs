import Hero from '../containers/Hero';
import Main from '../containers/Main';
import { REVALIDATE_TIME } from '../lib/utils/constant';
import { wrapper } from '../store';
import { getAllJobs, getJobsCategories, getLocations } from '../lib/api';
import {
  setCategories,
  setJobs,
  setLocations,
  setSelectedCategory,
} from '../store/jobs';

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const jobs = await getAllJobs(500);
  store.dispatch(setJobs(jobs));

  const categories = await getJobsCategories();
  store.dispatch(setCategories(categories));

  const locations = await getLocations();
  store.dispatch(setLocations(locations));

  store.dispatch(setSelectedCategory('all'));

  return {
    props: { jobs },
    revalidate: REVALIDATE_TIME, // Regenerate the page every 60 seconds w.r.t. with requests

    // notFound: true, // When you gave to return 404 page
    // redirect: {
    //   destination: '/another-route',
    // },
  };
});

export default function Home() {
  return (
    <>
      <Hero />
      <Main />
    </>
  );
}
