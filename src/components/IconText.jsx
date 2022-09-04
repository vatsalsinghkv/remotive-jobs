import Icon from './Icon';
import styles from '../styles/components/IconText.module.scss';

const IconText = ({ icon, children, className = '' }) => {
  const classes = `${className} ${styles['info__content']}`;

  return (
    <div className={classes}>
      {icon && <Icon type={icon} />}
      <p className={styles['info__text']}>{children}</p>
    </div>
  );
};

export default IconText;
