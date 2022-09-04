import { getId } from '../../lib/utils/helper';
import styles from '../../styles/components/Select.module.scss';

const Select = ({ options, onChange, value }) => {
  const changeHandler = (e) => {
    const value = e.target.value;
    console.log(value);
    onChange(value);
  };

  return (
    <select value={value} className={styles['select']} onChange={changeHandler}>
      <option value="all">all categories</option>
      {options.map((category) => (
        <option key={getId()} value={category}>
          {category.replace('-', ' ')}
        </option>
      ))}
    </select>
  );
};

export default Select;
