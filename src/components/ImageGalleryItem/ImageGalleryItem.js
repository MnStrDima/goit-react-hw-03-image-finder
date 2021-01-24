import styles from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ src, alt, largeImageUrl }) {
  return (
    <li className="ImageGalleryItem">
      <img
        src={src}
        alt={alt}
        data-large-url={largeImageUrl}
        className="ImageGalleryItem-image"
      />
    </li>
  );
}
