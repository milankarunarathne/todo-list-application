import React, { Component } from 'react';
import _ from 'lodash';
import './App.css';
import TodoItem from './modules/TodoItem';
import NewTodoItem from './modules/NewTodoItem';
import SearchTodo from './modules/SearchTodo';
import Title from './modules/Title';
import { connect } from 'react-redux';
import { fetchTodos } from './actions/loadTodoListActions';
import { updateTodoState, removeOneTodo } from './actions/todoActions';
import { createNewTodo } from './actions/newTodoActions';
import { removeCompletedTodos } from './actions/deleteManyTodosActions';
import { searchTodos } from './actions/searchTodosActions';
import imageOnLoading from './loadingImg.gif';
import imageOnError from './errorImg.gif';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: undefined,
      isFetching: undefined,
      todoList: [],
    };
  }

  async componentDidMount() {
    await this.props.fetchTodos();
  }

  async removemany() {
    if (
      !_.isEmpty(this.props.todoList.filter((todo) => todo.completed !== false))
    ) {
      this.props.removeCompletedTodos(this.props.todoList);
    }
  }

  render() {
    const { errorMessage, isFetching, todoList } = this.props;
    if (errorMessage) {
      return (
        <div>
          <p className="errorMessage"> {errorMessage}</p>
          <img src={imageOnError} alt="errorImg" className="errorOnLoading" />
        </div>
      );
    }

    if (isFetching) {
      return (
        <img src={imageOnLoading} alt="loadingImg" className="initialLaoding" />
      );
    }

    return (
      <div className="App">
        <div className="titlebar">
          <Title />
        </div>
        <div className="searchtododiv">
          <SearchTodo
            searchTodos={(search) => this.props.searchTodos(search)}
          />
        </div>
        <div className="topboader"></div>
        <div className="todoitems">
          {todoList.map((todo) => (
            <TodoItem
              key={todo._id}
              data={todo}
              updateTodoState={(id, completed) =>
                this.props.updateTodoState(id, completed)
              }
              removeOneTodo={(id) => this.props.removeOneTodo(id)}
            />
          ))}
        </div>
        <div className="newtodoitem">
          <NewTodoItem
            createNewTodo={(newTodoContent) =>
              this.props.createNewTodo(newTodoContent)
            }
            removemany={() => this.removemany()}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  errorMessage: state.todoListReducer.errorMessage,
  isFetching: state.todoListReducer.isFetching,
  todoList: state.todoListReducer.todoList,
});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTodos: () => {
      dispatch(fetchTodos());
    },
    updateTodoState: (id, completed) => {
      dispatch(updateTodoState(id, completed));
    },
    removeOneTodo: (id) => {
      dispatch(removeOneTodo(id));
    },
    createNewTodo: (newTodoContent) => {
      dispatch(createNewTodo(newTodoContent));
    },
    removeCompletedTodos: (todoList) => {
      dispatch(removeCompletedTodos(todoList));
    },
    searchTodos: (search) => {
      dispatch(searchTodos(search));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
