import { useState } from 'react';
import styles from '../../styles/components/SearchBar.module.scss';

const SearchBar = ({
  icon,
  placeholder,
  className,
  Button = '',
  defaultValue = '',
  onChange,
  onSubmit,
  ...props
}) => {
  const [value, setValue] = useState(defaultValue);

  const classes = `${styles['search-bar']} ${className || ''}`;

  const changeHandler = (e) => {
    const searchValue = e.target.value.trimStart();
    setValue(searchValue);
    if (!onChange) return;
    onChange(searchValue);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (!onSubmit) return;
    onSubmit(value);
  };

  return (
    <form
      className={classes}
      autoComplete='off'
      onSubmit={submitHandler}
      {...props}
    >
      {icon}
      <input
        type='search'
        name='search'
        value={value}
        onChange={changeHandler}
        className={styles['search-bar__input']}
        placeholder={placeholder}
      />
      {Button}
    </form>
  );
};

export default SearchBar;
