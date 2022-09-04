import PaginationButton from './PaginationButton';
import { useSelector } from 'react-redux';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';
import { getId } from '../../lib/utils/helper';
import styles from '../../styles/components/Pagination.module.scss';

const Pagination = () => {
  const { totalPages, currentPage } = useSelector((state) => state.pagination);

  if (totalPages <= 1) return;

  return (
    <div className={styles['pagination']}>
      {
        <PaginationButton
          type="prev"
          number={<IoChevronBack />}
          disable={currentPage === 1}
        />
      }
      {[...Array(totalPages)].map((_, i) => (
        <PaginationButton key={getId()} number={i + 1} />
      ))}
      {
        <PaginationButton
          type="next"
          number={<IoChevronForward />}
          disable={currentPage === totalPages}
        />
      }
    </div>
  );
};

export default Pagination;
