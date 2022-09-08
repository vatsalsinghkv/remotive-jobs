import Logo from '../components/Logo';
import { app } from '../lib/utils/portfolio';
import styles from '../styles/containers/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo name={app.name} />
    </header>
  );
};

export default Header;
