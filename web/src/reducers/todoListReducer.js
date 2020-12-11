import {
  FetchTodosActionTypes,
  UpdateIsCompleteTodoActionTypes,
  DeleteOneTodoActionTypes,
  CreateNewTodoActionTypes,
} from '../constants/actionTypes';

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
        todoList: action.payload,
        isFetching: false,
      };
    case FetchTodosActionTypes.FETCH_TODOS_FAILURE:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        todoList: [],
      };
    case UpdateIsCompleteTodoActionTypes.UPDATE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.map((todo) => {
          if (todo._id !== action.payload.id) {
            return todo;
          }
          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };
    case UpdateIsCompleteTodoActionTypes.UPDATE_TODO_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case DeleteOneTodoActionTypes.DELETE_TODO_SUCCESS:
      return {
        ...state,
        todoList: state.todoList.filter(
          (todo) => todo._id !== action.payload.id
        ),
      };
    case DeleteOneTodoActionTypes.DELETE_TODO_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    case CreateNewTodoActionTypes.CREATE_TODO_SUCCESS:
      return {
        ...state,
        todoList: [...state.todoList, action.payload],
      };
    case CreateNewTodoActionTypes.CREATE_TODO_FAILURE:
      return {
        ...state,
        errorMessage: action.payload.errorMessage,
      };
    default:
      return state;
  }
};

export default todoListReducer;
