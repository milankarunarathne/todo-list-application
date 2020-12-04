import React, { Component } from 'react';
import PropTypes from 'prop-types';
import '../css/NewTodoItem.css';

let textInput = React.createRef();

class NewTodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = { textInput: '' };
  }

  async handleMakeTodoButtonClick() {
    this.props.createNewTodo(textInput.current.value);
    this.setState({ textInput: '' });
  }

  async handleDeleteCompletedTodosButtonClick() {
    this.props.removeManyTodos();
  }

  render() {
    return (
      <div className="newtodoinput">
        <div className="input-group-prepend">
          <div className="input-group-text" id="basic-addon1">
            <p>New Todo</p>
          </div>
        </div>
        <input type="text" className="form-control" placeholder="Enter new Todo" aria-label="Username" aria-describedby="basic-addon1" ref={textInput} />
        <button type="button" className="btn btn-primary" onClick={() => this.handleMakeTodoButtonClick()}> Make Todo </button>
        <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteCompletedTodosButtonClick()}> Delete All completed </button>
      </div>
    );
  }
}

NewTodoItem.propTypes = {
  createNewTodo: PropTypes.func,
  removeManyTodos: PropTypes.func
};

export default NewTodoItem;
