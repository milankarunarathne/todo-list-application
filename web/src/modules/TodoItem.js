import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import '../css/TodoItem.css';
import RadioButtonCheck from './RadioButtonCheck';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {completed: props.data.completed};
  }

  async handleRadioButtonClick(id, completed) {
    this.setState({ completed : !completed });
    this.props.updateTodoState(id, !completed);
  }

  render() {
    const { _id, content, created_time} = this.props.data;
    const completed = this.state.completed;
    
    return (
      <div>
        <div className="todoitem">
          <div className = "todoCompleteButton" onClick={() => this.handleRadioButtonClick(_id, completed)}>
            <RadioButtonCheck completed={completed} />
          </div>

          <span><strong><p>{content}</p></strong>
          <p><small><i>{created_time}</i></small></p></span>
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
  __id: PropTypes.string,
  completed: PropTypes.bool,
  content: PropTypes.string,
  created_time: PropTypes.string,
};

export default TodoItem;
