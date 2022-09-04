import { toId } from '../../lib/utils/helper';
import styles from '../../styles/components/Input.module.scss';

const Input = ({ label, className, ...props }) => {
  const classes = `${styles[`form-control`]} ${className || ''}`;
  return (
    <div className={classes}>
      <input
        className={styles['form-control__input']}
        {...props}
        id={toId(label)}
      />
      <label htmlFor={toId(label)} className={styles['form-control__label']}>
        {label}
      </label>
    </div>
  );
};

export default Input;
