import axios from 'axios';
import { FetchTodosActionTypes } from '../constants/actionTypes';

const dataServer = 'http://localhost:8032';

export const fetchTodosBegin = () => ({
  type: FetchTodosActionTypes.FETCH_TODOS_START,
});

export const fetchTodosSuccess = (todosList) => ({
  type: FetchTodosActionTypes.FETCH_TODOS_SUCCESS,
  payload: [...todosList],
});

export const fetchTodosFailure = (error) => ({
  type: FetchTodosActionTypes.FETCH_TODOS_FAILURE,
  payload: error.message, 
});

export const fetchTodos = () => {
  const url = `${dataServer}/todos`;
  return (dispatch) => {
    dispatch(fetchTodosBegin());
    return axios
      .get(url)
      .then((response) => {
        return response;
      })
      .then((response) => handleErros(response))
      .then((response) => {
        dispatch(fetchTodosSuccess(response.data));
        return response.todos;
      })
      .catch((error) => dispatch(fetchTodosFailure(error)));
  };
};

function handleErros(response) {
  if (!response.statusText) {
    throw Error(response.statusText); 
  }
  return response;
}
