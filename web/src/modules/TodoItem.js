import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/TodoItem.css';
import RadioButtonCheck from './RadioButtonCheck';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { completed: this.props.data.completed };
  }

  render() {
    const { _id, content, created_time, completed } = this.props.data;
    return (
      <div>
        <div className="todoitem">
          <div
            className="todoCompleteButton"
            onClick={() => this.props.updateTodoState(_id, completed)}
          >
            <RadioButtonCheck completed={completed} />
          </div>
          <span>
            <p>
              <strong>{content}</strong>
            </p>
            <p>
              <small>
                <i>{created_time}</i>
              </small>
            </p>
          </span>
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => this.props.removeOneTodo(_id)}
          >
            Delete
          </button>
        </div>
      </div>
    );
  }
}

TodoItem.propTypes = {
  __id: PropTypes.string,
  completed: PropTypes.bool,
  content: PropTypes.string,
  created_time: PropTypes.string,
};

export default TodoItem;
