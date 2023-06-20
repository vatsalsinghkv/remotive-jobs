import { useRouter } from 'next/router';
import Form from '../components/Form';
import Input from '../components/Form/Input';
import SearchBar from '../components/Form/SearchBar';
import MutedText from '../components/MutedText';
import Icon from '../components/Icon';
import styles from '../styles/containers/Filter.module.scss';
import { useState } from 'react';
import { MAX_LOCATIONS } from '../lib/utils/constant';

const Filter = ({ className = '', fullTime, locations, selectedLocation }) => {
  const router = useRouter();
  const [searchLocation, setSearchLocation] = useState('');
  const [allLocations] = useState([...locations.all, ...locations.others]);

  const searchedLocations = allLocations
    .filter((l) => l.toLowerCase().includes(searchLocation.toLowerCase()))
    .slice(0, MAX_LOCATIONS + 2);

  const { all, others } = locations;

  let locs = [];
  if (others.length) {
    locs = ['all', ...all, 'others'];
  } else {
    locs = ['all', ...all];
  }

  const classes = `${styles.filter} ${className}`;

  const locationChangeHandler = (e) => {
    router.query.page = 1;
    router.query.location = e.target.value;
    router.push(router);
  };

  const locationSearchHandler = (location) => {
    setSearchLocation(location);
  };

  const fullTimeChangeHandler = (e) => {
    router.query.page = 1;
    router.query.fullTime = e.target.checked ? 1 : 0;
    router.push(router);
  };

  return (
    <aside className={classes}>
      <Input
        type='checkbox'
        name='fullTime'
        label='Full time'
        defaultChecked={fullTime}
        onChange={fullTimeChangeHandler}
      />

      <MutedText className={styles['filter__heading']}>location</MutedText>

      <SearchBar
        placeholder='City, state, zip code or country'
        icon={<Icon />}
        onChange={locationSearchHandler}
      />

      <Form
        className={styles['filter__form']}
        onChange={locationChangeHandler}
        inputs={searchLocation ? searchedLocations : locs}
        value={selectedLocation}
      />
    </aside>
  );
};

export default Filter;
