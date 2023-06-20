import { NO_OF_BUTTONS_VISIBLE } from '../../lib/utils/constant';
import { FaCircle } from 'react-icons/fa';

import styles from '../../styles/components/PaginationButton.module.scss';
import { useRouter } from 'next/router';

const PaginationButton = ({
  number = null,
  type,
  disable = false,
  totalPages,
  currentPage,
}) => {
  const router = useRouter();
  const isActive = currentPage === number;
  const classes = `${styles['pagination-button']} ${
    isActive ? styles['active'] : ''
  } ${disable ? styles['disabled'] : ''}`;

  const clickHandler = (e) => {
    if (disable) return;

    if (type) {
      if (type === 'prev') {
        router.query.page = currentPage - 1;
        router.push(router);
        // dispatch(setCurrentPage(currentPage - 1));
      } else if (type === 'next') {
        router.query.page = currentPage + 1;
        router.push(router);
        // dispatch(setCurrentPage(currentPage + 1));
      }
      return;
    }

    router.query.page = +e.target.id;
    router.push(router);
    // dispatch(setCurrentPage(+e.target.id));
  };

  if (
    number === currentPage ||
    number === 1 ||
    number === 2 ||
    number === totalPages ||
    number === currentPage - NO_OF_BUTTONS_VISIBLE ||
    number === currentPage + NO_OF_BUTTONS_VISIBLE ||
    number === currentPage + NO_OF_BUTTONS_VISIBLE + 1 ||
    type
  ) {
    if (
      (number > currentPage + NO_OF_BUTTONS_VISIBLE && number < totalPages) ||
      (number === 2 && currentPage > 3)
    ) {
      return (
        <p className={styles['dots']}>
          <FaCircle />
          <FaCircle />
          <FaCircle />
        </p>
      );
    }
    return (
      <button className={classes} id={number} onClick={clickHandler}>
        {number}
      </button>
    );
  }
};

export default PaginationButton;
