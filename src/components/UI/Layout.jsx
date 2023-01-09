import Header from '../../containers/Header';
import Footer from '../Footer';
import { app, author } from '../../lib/utils/portfolio';
import styles from '../../styles/components/Layout.module.scss';

const Layout = ({ children, className }) => {
  const classes = `${styles.layout} ${className}`;
  return (
    <div className={classes}>
      <Header />
      {children}
      <Footer name={author.name} github={app.github} />
    </div>
  );
};

export default Layout;
