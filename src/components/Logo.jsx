import Link from 'next/link';
import classes from '../styles/components/Logo.module.scss';

const Logo = ({ name, href = '/' }) => {
  const [firstName, ...rest] = name.split(' ');

  return (
    <Link href={href}>
      <a className={classes.logo}>
        <span className={classes['logo--main']}>{firstName} </span>
        <span className={classes['logo--sub']}>{rest.join(' ')}</span>
      </a>
    </Link>
  );
};

export default Logo;
