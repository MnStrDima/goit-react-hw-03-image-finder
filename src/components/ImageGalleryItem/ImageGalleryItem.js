import PropTypes from 'prop-types';
import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, largeImageUrl }) {
  return (
    <li className={styles.ImageGalleryItem}>
      <img
        src={src}
        alt={alt}
        data-large-url={largeImageUrl}
        className={styles.ImageGalleryItemImage}
      />
    </li>
  );
}

ImageGalleryItem.propTypes = PropTypes.shape({
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  largeImageUrl: PropTypes.string.isRequired,
}).isRequired;
