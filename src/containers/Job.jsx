import ReactHtmlParser from 'react-html-parser';
import Badge from '../components/Badge';
import Button from '../components/Button';
import Company from '../components/Company';
import IconText from '../components/IconText';
import MutedText from '../components/MutedText';
import { timeFormatter } from '../lib/utils/helper';
import { HiArrowNarrowLeft } from 'react-icons/hi';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { useRouter } from 'next/router';
import styles from '../styles/containers/Job.module.scss';

const transform = (node) => {
  // Do not render any <span> tags
  if (node.type === 'tag' && node.name === 'br') {
    return null;
  }

  if (node.children?.length === 0) {
    return null;
  }

  // Adding target='_blank' to link
  if (node.type === 'tag' && node.name === 'a') {
    node.attribs.target = '_blank';
  }

  // Do not render any tags with &nbsp;
  if (
    node.type === 'tag' &&
    (node.name === 'p' || node.name === 'div') &&
    node.children.length === 1 &&
    node.children[0].data
  ) {
    // node.children[0].data.trim();
    if (node.children[0].data.trim().length === 0) {
      return null;
    }
    // return <br />;
  }
};

const Job = ({
  title,
  job_type,
  publication_date,
  company_logo,
  company_name,
  candidate_required_location,
  description,
  url,
  salary,
  category,
}) => {
  const router = useRouter();
  return (
    <section className={styles['job']}>
      <aside className={styles['job__aside']}>
        <Button
          className={styles['aside__back-link']}
          onClick={router.back}
          variant="link"
        >
          <HiArrowNarrowLeft />
          Back to search
        </Button>

        <MutedText className={styles['aside__apply']}>how to apply</MutedText>

        <div className={styles['aside__content']}>
          <p>Please visit the Remotive page for more information</p>

          <Button
            type="link"
            to={url}
            className={styles['aside__button']}
            size="full-width"
            target="_blank"
            rel="noopener noreferrer"
          >
            Apply for this position
            <HiArrowNarrowRight />
          </Button>
        </div>
      </aside>
      <main className={styles['job__main']}>
        <header className={styles['job__header']}>
          <h1 className={`${styles['job__title']} heading-primary`}>{title}</h1>
          {job_type === 'full_time' && <Badge>Full time</Badge>}
          <Badge variant="fill" className={styles['job__category']}>
            {category}
          </Badge>
          {salary && (
            <h2 className={`${styles['job__salary']} heading-secondary`}>
              {salary}
            </h2>
          )}
        </header>
        <IconText icon="clock">{timeFormatter(publication_date)}</IconText>

        <Company
          name={company_name}
          logo={company_logo}
          location={candidate_required_location}
          className={styles['job__company']}
        />

        <main className={styles['job__description']}>
          {ReactHtmlParser(description, {
            transform,
          })}
        </main>
      </main>
    </section>
  );
};

export default Job;
