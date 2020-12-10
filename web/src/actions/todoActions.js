import axios from 'axios';
import {
  UpdateIsCompleteTodoActionTypes,
  DeleteOneTodoActionTypes,
} from '../constants/actionTypes';

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

export const deleteOneTodoActionSuccess = (id) => (
  console.log('this is reached'),
  {
    type: DeleteOneTodoActionTypes.DELETE_TODO_SUCCESS,
    payload: { id: id },
  }
);

export const deleteOneTodoActionFailure = (error) => ({
  type: DeleteOneTodoActionTypes.DELETE_TODO_FAILURE,
  payload: { errorMessage: error.message },
});

export const removeOneTodo = (id) => {
  const url = `${dataServer}/todos/remove/${id}`;
  return (dispatch) => {
    axios
      .delete(url)
      .then((response) => handleErros(response))
      .then((response) => {
        dispatch(deleteOneTodoActionSuccess(id));
        return response;
      })
      .catch((error) => dispatch(deleteOneTodoActionFailure(error)));
  };
};

function handleErros(response) {
  if (!response.statusText) {
    throw Error(response.statusText);
  }
  return response;
}
