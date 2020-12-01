import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import { Button } from 'react-bootstrap';
import '../css/NewTodoItem.css';
// import RadioButtonCheck from './RadioButtonCheck';

let textInput = React.createRef();

class NewTodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {textInput: ''};
  }

  async handleMakeTodoButtonClick() {
    // this.setState({ completed : !completed });
    // this.props.updateTodoState(id, !completed);

    console.log(textInput.current.value);
    this.props.createNewTodo(textInput.current.value);
    // console.log(content);
    this.setState({ textInput: ''});
  }

  async handleDeleteCompletedTodosButtonClick() {
    this.props.removeManyTodos()
  }

  render() {
    // const { _id, content, created_time} = this.props.data;
    // const completed = this.state.completed;

    

    return (
      // <div>
      <div className="newtodoinput">
        {/* <div className = "todoCompleteButton" onClick={() => this.handleRadioButtonClick(_id, completed)}>
            <RadioButtonCheck completed={completed} />
          </div> */}

        {/* <span><strong><p>{content}</p></strong> */}
        <div className="input-group-prepend">
          <div className="input-group-text" id="basic-addon1">
            <p style={{ width : '100px', margin: "20px", fontSize: '1.2em', fontWeight: '600' }}>New Todo</p>
          </div>
        </div>
        <input style={{ height: "auto" }}
          type="text"
          className="form-control"
          placeholder="Enter new Todo"
          aria-label="Username"
          aria-describedby="basic-addon1"
          // value={this.state.content}
          ref={textInput}
          
          
        />
        {/* <p><small><i>{created_time}</i></small></p></span> */}
        <button type="button" className="btn btn-primary" onClick={() => this.handleMakeTodoButtonClick()}>
          Make Todo
        </button>
        {/* <Button variant="outline-primary" onClick={() => this.loadData()}>
            Refresh
          </Button> */}
          <button type="button" className="btn btn-danger" onClick={() => this.handleDeleteCompletedTodosButtonClick()}>
          Delete All completed
        </button>
      </div>
      // </div>
    );
  }
}

// NewTodoItem.propTypes = {
//   __id: PropTypes.string,
//   completed: PropTypes.bool,
//   content: PropTypes.string,
//   created_time: PropTypes.string,
// };

export default NewTodoItem;
