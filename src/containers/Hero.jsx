import { useRouter } from 'next/router';
import { IoBriefcaseOutline } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { setSearch } from '../store/jobs';
import Searchbar from '../components/Form/SearchBar';
import Select from '../components/Form/Select';
import styles from '../styles/containers/Hero.module.scss';

const Hero = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { all: categories, selected: selectedCategory } = useSelector(
    (state) => state.jobs.categories
  );

  const searchHandler = (searchText) => {
    dispatch(setSearch(searchText));
  };

  const categoriesChangeHandler = (category) => {
    if (category === 'all') {
      router.push('/');
      return;
    }
    router.push(`/category/${category}`);
  };

  const select = (
    <Select
      options={categories}
      onChange={categoriesChangeHandler}
      value={selectedCategory}
    />
  );

  return (
    <div className={styles.hero}>
      <Searchbar
        icon={<IoBriefcaseOutline />}
        placeholder="Title, companies, expertise or benefits"
        button="Search"
        onChange={searchHandler}
        Button={select}
        className={styles['hero__search-bar']}
      />
    </div>
  );
};

export default Hero;
