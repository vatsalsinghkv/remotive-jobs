import CompanyLogo from './CompanyLogo';
import IconText from '../IconText';
import styles from '../../styles/components/Company.module.scss';

const Company = ({ name, logo, location, className }) => {
  const classes = `${className} ${styles['company']}`;

  return (
    <div className={classes}>
      <CompanyLogo logo={logo} name={name} size="sm" />

      <div className={styles['company__content']}>
        <h2 className={`${styles['company__name']} heading-secondary`}>
          {name}
        </h2>
        <IconText icon="earth">{location}</IconText>
      </div>
    </div>
  );
};

export default Company;
