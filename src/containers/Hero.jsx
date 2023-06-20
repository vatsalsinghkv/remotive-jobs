import { useRouter } from 'next/router';
import { IoBriefcaseOutline } from 'react-icons/io5';
import SearchBar from '../components/Form/SearchBar';
import Select from '../components/Form/Select';
import styles from '../styles/containers/Hero.module.scss';

const Hero = ({ categories, selectedCategory = 'all', search = '' }) => {
  const router = useRouter();

  const categoriesChangeHandler = (category) => {
    if (category === 'all') {
      router.push('/');
      return;
    }
    router.push(`/category/${category}`);
  };

  const submitHandler = (value) => {
    if (!value) return;
    const baseURL =
      selectedCategory === 'all' || selectedCategory === ''
        ? ''
        : `category/${selectedCategory}`;
    router.push({
      pathname: `/${baseURL}`,
      query: { search: value },
    });
  };

  return (
    <div className={styles.hero}>
      <SearchBar
        icon={<IoBriefcaseOutline />}
        placeholder='Title, companies, expertise or benefits'
        button='Search'
        defaultValue={search}
        onSubmit={submitHandler}
        Button={
          <Select
            options={categories}
            onChange={categoriesChangeHandler}
            value={selectedCategory}
          />
        }
        className={styles['hero__search-bar']}
      />
    </div>
  );
};

export default Hero;
