import { Component } from 'react';
import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import fetchImages from './services/imageFinderApi';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

export default class App extends Component {
  state = {
    searchQuery: '',
    page: 1,
    imageList: [],
    error: '',
    status: Status.IDLE,
    showModal: false,
    currentImgObj: { largeUrl: '', alt: '' },
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({
        imageList: [],
        status: Status.PENDING,
      });
      this.fetchProcessing(nextQuery);
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.resetPage();
  };

  handleButtonClick = () => {
    const nextQuery = this.state.searchQuery;
    this.setState({ status: Status.PENDING });
    this.fetchProcessing(nextQuery);
  };

  fetchProcessing = nextQuery => {
    fetchImages(nextQuery, this.state.page)
      .then(data => {
        if (data.hits.length === 0) {
          this.setState({ status: Status.IDLE });
          return toast.error('Unfortunately, there is nothing to show...');
        }
        this.setState(prevState => ({
          imageList: [...prevState.imageList, ...data.hits],
          status: Status.RESOLVED,
        }));
      })
      .catch(({ message }) =>
        this.setState({ error: message, status: Status.REJECTED }),
      )
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        this.setState(prevState => ({ page: (prevState.page += 1) }));
      });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  handleGalleryItemClick = e => {
    const largeUrl = e.target.dataset.largeUrl;
    const alt = e.target.alt;
    if (e.target.nodeName === 'IMG') {
      this.setState({ currentImgObj: { largeUrl, alt } });
    }
    this.toggleModal();
  };

  render() {
    const { imageList, error, status, showModal, currentImgObj } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {error && <h1>{error}</h1>}
        <ImageGallery
          imageList={imageList}
          onClick={this.handleGalleryItemClick}
        />
        {showModal && (
          <Modal
            src={currentImgObj.largeUrl}
            alt={currentImgObj.alt}
            onClose={this.toggleModal}
          ></Modal>
        )}
        <div className="container">
          {status === Status.PENDING && (
            <Loader
              className="loader"
              type="ThreeDots"
              color="#3f51b5"
              height={100}
              width={100}
            />
          )}
          {status === Status.RESOLVED && (
            <Button onClick={this.handleButtonClick} />
          )}
        </div>

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
