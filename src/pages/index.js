import Main from '../containers/Main';
import SEO from '../components/SEO';
import { wrapper } from '../store';
import { getAllJobs, getJobsCategories, getLocations } from '../lib/api';
import {
  setCategories,
  setJobs,
  setLocations,
  setSelectedCategory,
} from '../store/jobs';
import { getSeoData } from '../lib/utils/portfolio';
import { REVALIDATE_TIME } from '../lib/utils/constant';

export const getStaticProps = wrapper.getStaticProps((store) => async () => {
  const jobs = await getAllJobs();
  store.dispatch(setJobs(jobs));

  const categories = await getJobsCategories();
  store.dispatch(setCategories(categories));

  const locations = await getLocations();
  store.dispatch(setLocations(locations));

  store.dispatch(setSelectedCategory('all'));

  return {
    props: {
      jobs,
    },
    revalidate: REVALIDATE_TIME,
    // notFound: true, // When you gave to return 404 page
    // redirect: {
    //   destination: '/another-route',
    // },
  };
});

export default function Home() {
  return (
    <>
      <SEO {...getSeoData()} />
      <Main />
    </>
  );
}
