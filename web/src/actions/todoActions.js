import axios from 'axios';
import { UpdateIsCompleteTodoActionTypes } from '../constants/actionTypes';

const dataServer = 'http://localhost:8032';

export const updateIsCompleteActionSuccess = (id) => ({
  type: UpdateIsCompleteTodoActionTypes.UPDATE_TODO_SUCCESS,
  payload: { id: id },
});

export const updateIsCompleteActionFailure = (error) => ({
  type: UpdateIsCompleteTodoActionTypes.UPDATE_TODO_FAILURE,
  payload: { errorMessage: error.message },
});

export const updateTodoState = (id, completed) => {
  const url = `${dataServer}/todos/update/${id}`;
  return (dispatch) => {
    axios
      .patch(url, { completed: !completed })
      .then((response) => handleErros(response))
      .then((response) => {
        dispatch(updateIsCompleteActionSuccess(id));
        return response;
      })
      .catch((error) => dispatch(updateIsCompleteActionFailure(error)));
  };
};

function handleErros(response) {
  if (!response.statusText) {
    throw Error(response.statusText);
  }
  return response;
}
