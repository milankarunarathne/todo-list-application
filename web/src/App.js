// import logo from './logo.svg';
import React, { Component } from 'react';
import './App.css';
// import _JSXStyle from 'styled-jsx/style';
import TodoItem from './modules/TodoItem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todo_list: [
        {
          id: '1',
          isComplete: false,
          created_time: '2020-11-27 10:00:00',
          content: 'Learn React JS09 with more examples',
        },
        {
          id: '2',
          isComplete: false,
          created_time: '2020-11-27 10:00:00',
          content: 'Learn React JS11 with more examples',
        },
        {
          id: '3',
          isComplete: true,
          created_time: '2020-11-27 10:00:00',
          content: 'Learn React JS31 with more examples',
        },
      ],
    };
  }

  render() {
    return (
      <div className="App" style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        <div className="todoitems">
          {this.state.todo_list.map((todo) => (
            <TodoItem key={todo.id} content={todo.content} isComplete={todo.isComplete}/>
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
