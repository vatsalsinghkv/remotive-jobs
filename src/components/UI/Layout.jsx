import Header from '../../containers/Header';
import Footer from '../Footer';
import { author } from '../../lib/utils/portfolio';
import styles from '../../styles/components/Layout.module.scss';

const Layout = ({ children, className }) => {
  const classes = `${styles.layout} ${className}`;
  return (
    <div className={classes}>
      <Header />
      {children}
      <Footer name={author.name} github={author.github} />
    </div>
  );
};

export default Layout;
