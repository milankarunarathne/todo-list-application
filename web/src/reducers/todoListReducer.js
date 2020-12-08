import { FetchTodosActionTypes } from '../constants/actionTypes';

const INITIAL_STATE = {
  todoList: [],
  isFetching: false,
  errorMessage: undefined,
};

const todoListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FetchTodosActionTypes.FETCH_TODOS_START:
      return {
        ...state,
        isFetching: true,
      };
    case FetchTodosActionTypes.FETCH_TODOS_SUCCESS:
      return {
        ...state,
        todoList: action.payload.todos,
        isFetching: false,
      };
    case FetchTodosActionTypes.FETCH_TODOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload.error,
        todoList: []
      };
    default:
      return state;
  }
};

export default todoListReducer;
