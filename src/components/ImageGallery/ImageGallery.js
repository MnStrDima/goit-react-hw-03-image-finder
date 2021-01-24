import { Component } from 'react';
import styles from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

export default class ImageGallery extends Component {
  state = {
    imageList: [],
  };
  componentDidUpdate(prevProps, prevState) {
    const prevList = prevState.imageList;
    const nextList = this.props.imageList;
    if (prevList !== nextList) {
      this.setState({ imageList: this.props.imageList });
    }
  }
  render() {
    return (
      <ul className="ImageGallery" onClick={this.props.onClick}>
        {this.state.imageList.map(image => (
          <ImageGalleryItem
            key={image.id}
            src={image.webformatURL}
            alt={image.type}
            largeImageUrl={image.largeImageURL}
          />
        ))}
      </ul>
    );
  }
}
