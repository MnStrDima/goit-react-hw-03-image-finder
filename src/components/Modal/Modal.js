import { createPortal } from 'react-dom';
import { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';
const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  static propTypes = PropTypes.shape({
    src: PropTypes.string,
    alt: PropTypes.string,
    onClose: PropTypes.func,
    children: PropTypes.element,
  }).isRequired;

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { src, alt } = this.props;
    return createPortal(
      <div className={styles.Overlay} onClick={this.handleBackdropClick}>
        <div className={styles.Modal}>
          <img src={src} alt={alt} />
          {this.props.children}
        </div>
      </div>,
      modalRoot,
    );
  }
}
