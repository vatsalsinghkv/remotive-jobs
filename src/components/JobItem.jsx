import Link from 'next/link';
import Badge from './Badge';
import IconText from './IconText';
import CompanyLogo from './Company/CompanyLogo';
import styles from '../styles/components/JobItem.module.scss';

const JobItem = ({
  id,
  title,
  name,
  logo,
  type,
  date,
  location,
  salary,
  category,
}) => {
  return (
    <li>
      <Link href={`/job/${id}`}>
        {/*
         * Link automatically renders a (anchor) tag
         * To add custom styles we need to add an anchor tag of our own in Link tag
         * Link will not renders anchor tag if its already there
         */}
        <a className={styles['job']}>
          <CompanyLogo
            logo={logo}
            name={name}
            className={styles['job__logo']}
          />
          <div className={styles['job__content']}>
            <p className={styles['job__company-name']}>{name}</p>
            <div className={styles['job__title-container']}>
              <h2 className={styles['job__title']}>{title}</h2>
              <Badge variant="fill">{category}</Badge>
            </div>
            {type === 'full_time' && <Badge>Full time</Badge>}
          </div>
          <div className={styles['info']}>
            {salary && <IconText>{salary}</IconText>}
            {location && <IconText icon="earth">{location}</IconText>}
            <IconText icon="clock">{date}</IconText>
          </div>
        </a>
      </Link>
    </li>
  );
};

export default JobItem;
