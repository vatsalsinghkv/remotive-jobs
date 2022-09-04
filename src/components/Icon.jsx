import { FaRegClock, FaDollarSign } from 'react-icons/fa';
import { IoEarth } from 'react-icons/io5';
import styles from '../styles/components/Icon.module.scss';

const EarthIcon = ({ type = 'earth' }) => {
  const classes = styles.icon;

  switch (type) {
    case 'earth':
      return <IoEarth className={classes} />;
    case 'clock':
      return <FaRegClock className={classes} />;
    case 'money':
      <FaRegClock className={classes} />;
    default:
      break;
  }
};

export default EarthIcon;
