import Header from '../../containers/Header';
import styles from '../../styles/components/Layout.module.scss';

const Layout = ({ children, className }) => {
  const classes = `${styles.layout} ${className}`;
  return (
    <div className={classes}>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
