import { combineReducers } from 'redux';
// import todoReducer from './reducers/todoReducer';
import todoListReducer from './reducers/todoListReducer';

const reducer = combineReducers({
  // todoReducer,
  todoListReducer,
});

export default reducer;
