import { Component } from 'react';
import { ImSearch } from 'react-icons/im';
import { toast } from 'react-toastify';

import styles from './Searchbar.module.css';

export default class Searchbar extends Component {
  state = {
    initialValue: '',
  };

  handleInputChange = e => {
    this.setState({ initialValue: e.currentTarget.value.toLowerCase() });
  };

  handleSubmit = e => {
    e.preventDefault();
    if (this.state.initialValue.trim() === '') {
      toast.error('Please enter your query.');
      return;
    }
    this.props.onSubmit(this.state.initialValue.trim());
    this.setState({ initialValue: '' });
  };

  render() {
    return (
      <header className="Searchbar">
        <form className="SearchForm" onSubmit={this.handleSubmit}>
          <button type="submit" className="SearchForm-button">
            <span className="SearchForm-button-label">
              <ImSearch />
              Search
            </span>
          </button>

          <input
            className="SearchForm-input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.initialValue}
            onChange={this.handleInputChange}
          />
        </form>
      </header>
    );
  }
}
