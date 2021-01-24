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
    error: null,
    status: Status.IDLE,
    showModal: false,
    largeImageUrl: '',
    alt: '',
  };

  componentDidUpdate(prevProps, prevState) {
    const prevQuery = prevState.searchQuery;
    const nextQuery = this.state.searchQuery;

    if (prevQuery !== nextQuery) {
      this.setState({ status: Status.PENDING });
      console.log(this.state.status);
      fetchImages(nextQuery, this.state.page)
        .then(data => {
          if (data.hits.length === 0) {
            return toast.error('Unfortunately, there is nothing to show...');
          }
          this.setState({
            imageList: [...data.hits],
            status: Status.RESOLVED,
          });
          console.log(this.state.imageList);
        })
        .catch(error => this.setState({ error, status: Status.REJECTED }))
        .finally(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
          console.log(this.state.status);
          this.setState(prevState => ({ page: (prevState.page += 1) }));
        });
    }
  }

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
    this.resetPage();
  };

  handleButtonClick = () => {
    console.log(this.state.page);
    this.setState({ status: Status.PENDING });
    console.log(this.state.status);
    fetchImages(this.state.searchQuery, this.state.page)
      .then(data => {
        if (data.hits.length === 0) {
          return toast.error('Unfortunately, there is nothing to show...');
        }
        this.setState(prevState => ({
          imageList: [...prevState.imageList, ...data.hits],
          status: Status.RESOLVED,
        }));
        console.log(this.state.imageList);
      })
      .catch(error => this.setState({ error, status: Status.REJECTED }))
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
        this.setState(prevState => ({ page: (prevState.page += 1) }));
        console.log(this.state.status);
      });
  };

  resetPage = () => {
    this.setState({ page: 1 });
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleGalleryItemClick = e => {
    if (e.target.nodeName === 'IMG') {
      this.setState({
        largeImageUrl: e.target.dataset.largeUrl,
        alt: e.target.alt,
      });
    }
    this.toggleModal();
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.handleFormSubmit} />
        {this.state.error && <h1>{this.state.error.message}</h1>}
        <ImageGallery
          imageList={this.state.imageList}
          onClick={this.handleGalleryItemClick}
        />
        {this.state.showModal && (
          <Modal
            src={this.state.largeImageUrl}
            alt={this.state.alt}
            onClose={this.toggleModal}
          />
        )}
        {this.state.status === Status.PENDING && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={3000}
          />
        )}
        {this.state.status === Status.RESOLVED && (
          <Button onClick={this.handleButtonClick} />
        )}

        <ToastContainer autoClose={2000} />
      </>
    );
  }
}
