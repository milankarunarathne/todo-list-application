// import logo from './logo.svg';
import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';
import TodoItem from './modules/TodoItem';
import NewTodoItem from './modules/NewTodoItem';
// import Title from './modules/Title';

const dataServer = 'http://localhost:8032';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosObjArray: [],
    };
  }

  async componentDidMount() {
    await this.loadData();
  }

  async loadData() {
    const res = await axios.get(`${dataServer}/todos`);
    if (res.status === 200) {
      if (!res.data) {
        return;
      }
      this.setState({...this.state, todosObjArray : res.data});
    }
  }

  async removeTodo(id) {
    const res = await axios.delete(`${dataServer}/todos/remove/${id}`);
    if (res.status === 200) {
      const newObjArray = this.state.todosObjArray;
      _.remove(newObjArray, { _id: id });
      this.setState({ ...this.state, todosObjArray: newObjArray });
    }
  }

  async removeManyTodos() {
    let newArray = this.state.todosObjArray;
    let idArray = _.remove(newArray, { completed: true })
    if (!_.isEmpty(idArray)){
      idArray = _.map(idArray, '_id');  
      const res = await axios.delete(`${dataServer}/todos/removemany`, { data: { idArray: idArray}})
      if (res.status === 200) {
        this.setState ({...this.state, todosObjArray: newArray});
      }
    }
  }

  async updateTodoState(id, completed) {
    const res = await axios.patch(`${dataServer}/todos/update/${id}`, {
      completed: !completed,
    });
  
    if ( res.status === 200 ) {
      const elementIndex = this.state.todosObjArray.findIndex(element => element._id === id)
      const newArray = this.state.todosObjArray;
      newArray[elementIndex] = {...newArray[elementIndex], completed: !completed};
      this.setState({...this.state.todosObjArray, newArray});
    }
  }

  async createNewTodo(newTodoContent) {
    const created_time = new Date().toLocaleString();
    const newTodoObj = {
      completed: false,
      content: newTodoContent,
      created_time: created_time,
    };
    const res = await axios.post(`${dataServer}/todos/create`, newTodoObj);
    if (res.status === 200) {
      newTodoObj._id = res.data[0]._id;
    }
    const newTodoList = [...this.state.todosObjArray, newTodoObj];
    this.setState({ ...this.state, todosObjArray: newTodoList });
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        {/* <div className="titlebar"> */}
        {/* <Title  style={{ position: 'fixed', top: 0, left: 0, width: '90%' }} /> */}
        {/* </div> */}
        <div className="todoitems">
          {this.state.todosObjArray.map((todo) => (
            <TodoItem
              key={todo._id}
              data={todo}
              updateTodoState={(id, completed) =>
                this.updateTodoState(id, completed)
              }
              removeTodo={(id) => this.removeTodo(id)}
            />
          ))}
        </div>

        {/* <style jsx>{`
          .App {
            font-family: sans-serif;
          }

          .todoitems {
            flex-direction: column;
            color: blue;
          }

        `}</style> */}

        <div className="newtodoitem">
          <NewTodoItem
            createNewTodo={(newtodo) => this.createNewTodo(newtodo)}
            removeManyTodos={() => this.removeManyTodos()}
          />
        </div>
      </div>
    );
  }
}

export default App;
