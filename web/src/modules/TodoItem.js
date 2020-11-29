import React, { Component } from 'react';
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
          <button type="button" class="btn btn-danger">
            Delete
          </button>
        </div>
      </div>
    );
  }
}

export default TodoItem;
