import styles from '../styles/components/Badge.module.scss';

const Badge = ({ children, className, variant }) => {
  const classes = `${styles.badge} ${className} ${
    variant ? styles['fill'] : ''
  }`;
  return <span className={classes}>{children}</span>;
};

export default Badge;
