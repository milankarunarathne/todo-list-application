import axios from 'axios';
import { CreateNewTodoActionTypes } from '../constants/actionTypes';

const dataServer = 'http://localhost:8032';

export const createNewTodoActionSuccess = (newTodo) => ({
  type: CreateNewTodoActionTypes.CREATE_TODO_SUCCESS,
  payload: newTodo,
});

export const createNewTodoActionFailure = (error) => ({
  type: CreateNewTodoActionTypes.CREATE_TODO_FAILURE,
  payload: { errorMessage: error.message },
});

export const createNewTodo = (newTodoContent) => {
  const url = `${dataServer}/todos/create`;
  return (dispatch) => {
    axios
      .post(url, {
        completed: false,
        content: newTodoContent,
        created_time: new Date().toLocaleString(),
      })
      .then((response) => handleErros(response))
      .then((response) => {
        dispatch(createNewTodoActionSuccess(response.data[0]));
        return response;
      })
      .catch((error) => dispatch(createNewTodoActionFailure(error)));
  };
};

function handleErros(response) {
  if (!response.statusText) {
    throw Error(response.statusText);
  }
  return response;
}
