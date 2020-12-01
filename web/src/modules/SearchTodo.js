import React, { Component } from 'react';

class SearchTodo extends Component {
  constructor(props) {
    super(props);
    this.state = {search: ''};
  }

  handleSearchInputTrigger = (e) => {
    this.props.searchTodos(e.target.value);
    this.setState({ search: e.target.value });
  }

  render() {
    return (
      <div>
        <div className="searchInput" style={{display: "flex", flexDirection: "row", width: '90%', marginLeft: '5%', backgroundColor: 'rgba(36, 63, 23, 1)', padding: 10, marginTop: '90px', zIndex:1, position:'fixed' }}>
          <input className="form-control" type="text" placeholder="Search..."
           aria-label="Search" value={this.state.search} id="search-input" 
           onChange={this.handleSearchInputTrigger}
           />
        </div>
      </div>
    );
  }
}

export default SearchTodo;
