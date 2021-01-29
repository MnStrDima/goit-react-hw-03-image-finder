import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader-spinner';

import styles from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.element,
  }).isRequired;

  state = {
    isImageLoading: true,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
      this.setState({ isImageLoading: true });
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
      this.setState({ isImageLoading: true });
    }
  };

  onImageLoad = () => {
    this.setState({ isImageLoading: false });
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          {this.state.isImageLoading && (
            <Loader
              className="loader"
              type="ThreeDots"
              color="#3f51b5"
              height={100}
              width={100}
            />
          )}
          <img src={src} alt={alt} onLoad={this.onImageLoad} />

          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}
