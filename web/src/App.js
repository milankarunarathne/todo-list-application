import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';
import './App.css';
import TodoItem from './modules/TodoItem';
import NewTodoItem from './modules/NewTodoItem';
import SearchTodo from './modules/SearchTodo';
import Title from './modules/Title';

const dataServer = 'http://localhost:8032';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todoList: [],
    };
  }

  async componentDidMount() {
    const todoList = await this.loadData();
    this.setState({...this.state, todoList});
  }

  async loadData() {
    const res = await axios.get(`${dataServer}/todos`);
    if (res.status === 200 && res.data) {
        return res.data;
    }
    return [];
  }

  async removeTodo(id) {
    const res = await axios.delete(`${dataServer}/todos/remove/${id}`);
    if (res.status === 200) {
      const index = this.state.todoList.findIndex(element => element._id === id);
      const todoList = [...this.state.todoList.slice(0, index), ...this.state.todoList.slice(index+1)]
      console.log('prev >>> ', this.state);
      this.setState({ ...this.state, todoList });
      console.log('now <<< ', { ...this.state, todoList });
    }
  }

  async removeManyTodos() {
    let newArray = this.state.todoList;
    let idArray = _.remove(newArray, { completed: true });
    if (!_.isEmpty(idArray)) {
      idArray = _.map(idArray, '_id');
      const res = await axios.delete(`${dataServer}/todos/removemany`, {
        data: { idArray: idArray },
      });
      if (res.status === 200) {
        console.log('prev >>> ', this.state.todoList);
        this.setState({ ...this.state, todoList: newArray });
        console.log('now <<< ', { ...this.state, todoList: newArray });
      }
    }
  } 

  async updateTodoState(id, completed) {
    const res = await axios.patch(`${dataServer}/todos/update/${id}`, {
      completed: !completed,
    });
    if (res.status === 200) {
      const index = this.state.todoList.findIndex((element) => element._id === id);
      const todoList = this.state.todoList;
      todoList[index] = {...todoList[index], completed: !completed,};
      this.setState({ ...this.state, todoList: todoList });
      console.log('now <<< ', { ...this.state, todoList });
    }
  }

  async createNewTodo(newTodoContent) {
    const created_time = new Date().toLocaleString();
    const newTodo = {
      completed: false,
      content: newTodoContent,
      created_time: created_time,
    };
    const res = await axios.post(`${dataServer}/todos/create`, newTodo);
    if (res.status === 200) {
      const todoList = [...this.state.todoList, ...res.data];
      console.log('prev >>> ', this.state);
      this.setState({ ...this.state, todoList: todoList });
      console.log('now <<< ', { ...this.state, todoList });
    }
  }

  async searchTodos(search) {
    console.log('searched result');
    console.log(search);
    const res = await axios.get(`${dataServer}/todos/search?content=${search}`);
    if (res.status === 200 && res.data) {
      console.log('prev >>> ', this.state.todoList);
      this.setState({...this.state, todoList: res.data});
      console.log('now <<< ', { ...this.state, todoList: res.data });
    }
  }

  render() {

    return (

      <div className="App" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
         <div className="titlebar">
          <Title/>
         </div>
         
        {/* <Title  style={{ position: 'fixed', top: 0, left: 0, width: '90%' }} /> */}
        {/* </div> */}
        <div className="searchtododiv">
          <SearchTodo searchTodos={(search) => this.searchTodos(search)} />
        </div>
        
       <div className="topboader"></div>
        <div className="todoitems">
          {this.state.todoList.map((todo) => (
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
