import Image from 'next/image';
import imgNotFound from '../../../public/assets/search-rafiki.svg';
import styles from '../../styles/components/Error.module.scss';

const Error = ({ message, type = 'not-found', className }) => {
  let img,
    name = 'web';

  switch (type) {
    case 'not-found':
      img = imgNotFound;
      break;

    default:
      img = imgNotFound;
      break;
  }

  return (
    <div className={styles['error']}>
      <div className={styles['error__img']}>
        <Image src={img} alt="Illustration" />
      </div>
      <a
        target="_blank"
        rel="noreferrer"
        href={`https://storyset.com/${name}`}
        className="icon-attribute"
      >
        {name} illustrations by Storyset
      </a>

      <h2 className={styles['error__text']}>{message}</h2>
    </div>
  );
};

export default Error;
