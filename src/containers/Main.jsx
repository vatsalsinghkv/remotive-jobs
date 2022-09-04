import Filter from './Filter';
import Jobs from './Jobs';
import styles from '../styles/containers/Main.module.scss';
import { useSelector } from 'react-redux';
import Error from '../components/UI/Error';

const Main = () => {
  const jobs = useSelector((state) => state.jobs.filtered);

  if (!jobs.length) {
    return <Error message="Oops!... No results found" />;
  }
  return (
    <>
      <main className={styles['main']}>
        <Filter className={styles['main__aside']} />
        <Jobs className={styles['main__jobs']} />
      </main>
    </>
  );
};

export default Main;
