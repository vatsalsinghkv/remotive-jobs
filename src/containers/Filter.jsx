import { useDispatch, useSelector } from 'react-redux';
import { setFullTime, setLocation, setLocationSearch } from '../store/jobs';
import Form from '../components/Form';
import Input from '../components/Form/Input';
import SearchBar from '../components/Form/SearchBar';
import MutedText from '../components/MutedText';
import Icon from '../components/Icon';
import styles from '../styles/containers/Filter.module.scss';

const Filter = ({ className = '' }) => {
  const dispatch = useDispatch();
  const { filtered: locations, selected } = useSelector(
    (state) => state.jobs.locations
  );

  const classes = `${styles.filter} ${className}`;

  const locationChangeHandler = (e) => {
    const location = e.target.value;
    dispatch(setLocation(location));
  };

  const locationSearchHandler = (location) => {
    dispatch(setLocationSearch(location));
  };

  const fullTimeChangeHandler = (e) => {
    dispatch(setFullTime(e.target.checked));
  };

  return (
    <aside className={classes}>
      <Input
        type="checkbox"
        name="fullTime"
        label="Full time"
        onChange={fullTimeChangeHandler}
      />

      <MutedText className={styles['filter__heading']}>location</MutedText>

      <SearchBar
        placeholder="City, state, zip code or country"
        icon={<Icon />}
        onChange={locationSearchHandler}
      />

      <Form
        className={styles['filter__form']}
        onChange={locationChangeHandler}
        inputs={locations}
        value={selected}
      />
    </aside>
  );
};

export default Filter;
