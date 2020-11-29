// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
import TodoItem from './modules/TodoItem';
import axios from 'axios';

const dataServer = 'http://localhost:8032';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todosObjArray: [],
    };
  }

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

  async componentDidMount() {
    await this.loadData();
    this.setState(this.state.todosObjArray);
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <div className="todoitems">
          {this.state.todosObjArray.map((todo) => (
            <TodoItem
              key={todo._id}
              content={todo.content}
              isComplete={todo.completed}
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
      </div>
    );
  }
}

export default App;
