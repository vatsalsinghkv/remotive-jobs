import Filter from './Filter';
import Jobs from './Jobs';
import Hero from './Hero';
import styles from '../styles/containers/Main.module.scss';

const Main = () => {
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
