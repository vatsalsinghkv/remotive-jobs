import Filter from './Filter';
import Jobs from './Jobs';
import Hero from './Hero';
import Error from '../components/UI/Error';
import { useSelector } from 'react-redux';
import styles from '../styles/containers/Main.module.scss';

const Main = () => {
  const jobs = useSelector((state) => state.jobs.filtered);

  if (!jobs.length) {
    return <Error message="Oops!... No results found" />;
  }
  return (
    <>
      <Hero />
      <main className={styles['main']}>
        <Filter className={styles['main__aside']} />
        <Jobs className={styles['main__jobs']} />
      </main>
    </>
  );
};

export default Main;
