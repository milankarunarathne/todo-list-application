import React, { Component } from 'react';
import '../css/Title.css';

class Title extends Component {
  render() {
    return (
      <div className="navbar">
        <div className="title">
          <h1>My Todo List</h1>
        </div>
      </div>
    );
  }
}

export default Title;
