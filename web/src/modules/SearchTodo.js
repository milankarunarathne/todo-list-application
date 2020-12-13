import { debounce } from 'lodash';
import React, { Component } from 'react';
import '../css/SearchTodo.css';

class SearchTodo extends Component {
  constructor(props) {
    super(props);
    this.state = { search: '' };
    this.onChangeDebounced = debounce(this.onChangeDebounced, 300);
  }

  handleSearchInputTrigger = (e) => {
    this.setState({ search: e.target.value });
    this.onChangeDebounced(e);
  };

  onChangeDebounced = (e) => {
    this.props.searchTodos(e.target.value);
  };

  render() {
    return (
      <div>
        <div className="searchInput">
          <input
            className="form-control"
            type="text"
            placeholder="Search..."
            aria-label="Search"
            id="search-input"
            value={this.state.search}
            onChange={this.handleSearchInputTrigger}
          />
        </div>
      </div>
    );
  }
}

export default SearchTodo;
