import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';
import PropTypes from 'prop-types';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  };

  state = {
    initialValue: '',
  };

  handleInputChange = e => {
    this.setState({ initialValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { initialValue } = this.state;
    const { onSubmit } = this.props;
    if (initialValue.trim() === '') {
      toast.error('Please enter your query.');
      return;
    }
    onSubmit(initialValue.trim());
    this.setState({ initialValue: '' });
  };

  render() {
    const { initialValue } = this.state;
    return (
      <header className={styles.Searchbar}>
        <form className={styles.SearchForm} onSubmit={this.handleSubmit}>
          <button type="submit" className={styles.SearchFormButton}>
            <span className={styles.SearchFormButtonLabel}>
              <ImSearch />
              Search
            </span>
          </button>

          <input
            className={styles.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={initialValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
