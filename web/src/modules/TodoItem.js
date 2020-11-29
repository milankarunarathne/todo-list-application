import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import '../css/TodoItem.css';
// import { MdRadioButtonUnchecked, MdRadioButtonChecked } from 'react-icons/md';
import RadioButtonCheck from './RadioButtonCheck';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //     completed: null,
    //     created_time: null,
    //     content: null
    // }
  }

  render() {
    //   const { id, completed, created_time, content} = this.props.data;
    // const content = this.props.content;
    return (
      <div>
        <div className="todoitem">
          <RadioButtonCheck isComplete={this.props.isComplete} />
          <p>{this.props.content}</p>
          <button type="button" className="btn btn-danger">
            Delete
          </button>
          {/* <Button variant="outline-primary" onClick={() => this.loadData()}>
            Refresh
          </Button> */}
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  _id: PropTypes.string,
  completed: PropTypes.bool,
  content: PropTypes.string,
  created_time: PropTypes.string
};

export default TodoItem;
