import { Component } from 'react';
import PropTypes from 'prop-types';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  static propTypes = PropTypes.shape({
    imageList: PropTypes.array.isRequired,
    onClick: PropTypes.func.isRequired,
  }).isRequired;

  render() {
    const { onClick, imageList } = this.props;
    return (
      <ul className={styles.ImageGallery} onClick={onClick}>
        {imageList.map(({ webformatURL, type, largeImageURL }, index) => (
          <ImageGalleryItem
            key={index}
            src={webformatURL}
            alt={type}
            largeImageUrl={largeImageURL}
          />
        ))}
      </ul>
    );
  }
}
