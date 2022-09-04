import Logo from '../components/Logo';
import styles from '../styles/containers/Header.module.scss';

const Header = () => {
  return (
    <header className={styles.header}>
      <Logo name="remotive jobs" />
    </header>
  );
};

export default Header;
