import { combineReducers } from 'redux';
// import todo from './reducers/todo';
import todoListReducer from './reducers/todoListReducer';

const reducer = combineReducers({
  // todo,
  todoListReducer,
});

export default reducer;
