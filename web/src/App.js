// import logo from './logo.svg';
import React, { Component } from 'react';
import axios from 'axios';
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
    this.setState(this.state.todosObjArray);
  }
  
    // async componentWillUpdate() {
  
    // }

  async loadData() {
    const res = await axios.get(`${dataServer}/todos`);
    if (res.status === 200) {
      if (!res.data) {
        return;
      }
      this.state.todosObjArray = res.data;
      console.log(res.data);
    }
  }

  async updateTodoState(id, completed) {
    axios.patch(`${dataServer}/todos/update/${id}`, {
      completed: completed,
    });
  }

  async createNewTodo (newTodoContent) {
    const created_time = new Date().toLocaleString();
    const newTodoObj = {
      completed: false,
      content: newTodoContent,
      created_time: created_time
    }
    const res = await axios.post(`${dataServer}/todos/create`, newTodoObj)
    if ( res.status === 200) {
      newTodoObj._id = res.data[0]._id;

    }
    const newTodoList = [...this.state.todosObjArray, newTodoObj];
    this.setState({ ...this.state, todosObjArray: newTodoList});
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
              <NewTodoItem  createNewTodo={(newtodo) => this.createNewTodo(newtodo)} />
        </div>
      
      </div>
    );
  }
}

export default App;
