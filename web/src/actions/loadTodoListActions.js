// import { FetchTodosActionTypes } from '../constants/actionTypes';
// // import todoListReducer from '../reducers/todoListReducer';

// export const fetchTodosBegin = () => {
//   return {
//     type: FetchTodosActionTypes.FETCH_TODOS_START,
//   };
// };

// export const fetchTodosSuccess = (todos) => {
//   return {
//     type: FetchTodosActionTypes.FETCH_TODOS_SUCCESS,
//     payload: {todos}
//   };
// };

// export const fetchTodosFailure = (error) => {
//   return {
//     type: FetchTodosActionTypes.FETCH_TODOS_FAILURE,
//     payload: { error },
//   };
// };

import { FetchTodosActionTypes } from '../constants/actionTypes';
// import todoListReducer from '../reducers/todoListReducer';

export const fetchTodosBegin = () => ({
  type: FetchTodosActionTypes.FETCH_TODOS_START,
});

export const fetchTodosSuccess = (todos) => ({
  type: FetchTodosActionTypes.FETCH_TODOS_SUCCESS,
  payload: { todos },
});

export const fetchTodosFailure = (error) => ({
  type: FetchTodosActionTypes.FETCH_TODOS_FAILURE,
  payload: { error },
});
