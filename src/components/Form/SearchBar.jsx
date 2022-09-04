import { useState } from 'react';
import styles from '../../styles/components/SearchBar.module.scss';

const Searchbar = ({ onChange, icon, placeholder, className, Button = '' }) => {
  const [value, setValue] = useState('');
  const classes = `${styles['search-bar']} ${className || ''}`;

  const changeHandler = (e) => {
    const searchValue = e.target.value.trimStart();
    setValue(searchValue);
    onChange(searchValue);
  };

  return (
    <form className={classes} autoComplete="off">
      {icon}
      <input
        type="search"
        name="search-bar"
        value={value}
        onChange={changeHandler}
        className={styles['search-bar__input']}
        placeholder={placeholder}
      />
      {Button}
    </form>
  );
};

export default Searchbar;
