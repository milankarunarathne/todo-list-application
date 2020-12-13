import axios from 'axios';
import { SearchTodosActionTypes } from '../constants/actionTypes';

const dataServer = 'http://localhost:8032';

export const searchTodosActionSuccess = (todoList) => ({
  type: SearchTodosActionTypes.SEARCH_TODOS_SUCCESS,
  payload: todoList,
});

export const searchTodosActionFailure = (error) => ({
  type: SearchTodosActionTypes.SEARCH_TODOS_FAILURE,
  payload: { errorMessage: error.message },
});

export const searchTodos = (search) => {
  const url = `${dataServer}/todos/search?content=${search}`;
  return (dispatch) => {
    axios
      .get(url)
      .then((response) => handleErros(response))
      .then((response) => {
        dispatch(searchTodosActionSuccess(response.data));
        return response;
      })
      .catch((error) => dispatch(searchTodosActionFailure(error)));
  };
};

function handleErros(response) {
  if (!response.statusText) {
    throw Error(response.statusText);
  }
  return response;
}
