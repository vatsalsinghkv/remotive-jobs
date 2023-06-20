import { memo } from 'react';
import styles from '../styles/components/Footer.module.scss';

const Footer = ({ name, github }) => {
  return (
    <footer className={styles.footer}>
      {'created by '}
      <a className={styles.name} href={github} target='_blank' rel='noreferrer'>
        {name}
      </a>
      {/*       {' - '}
      <a href="https://www.devchallenges.io/" target="_blank" rel="noreferrer">
        devChallenges.io
      </a> */}
    </footer>
  );
};

export default memo(Footer);
