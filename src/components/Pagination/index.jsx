import PaginationButton from './PaginationButton';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { getId } from '../../lib/utils/helper';
import styles from '../../styles/components/Pagination.module.scss';

const Pagination = ({ totalPages, currentPage }) => {
  if (totalPages <= 1) return;

  return (
    <div className={styles['pagination']}>
      {
        <PaginationButton
          totalPages={totalPages}
          currentPage={currentPage}
          type='prev'
          number={<IoChevronBack />}
          disable={currentPage === 1}
        />
      }
      {[...Array(totalPages)].map((_, i) => (
        <PaginationButton
          key={getId()}
          number={i + 1}
          totalPages={totalPages}
          currentPage={currentPage}
        />
      ))}
      {
        <PaginationButton
          totalPages={totalPages}
          currentPage={currentPage}
          type='next'
          number={<IoChevronForward />}
          disable={currentPage === totalPages}
        />
      }
    </div>
  );
};

export default Pagination;
