import axios from 'axios';
import { DeleteCompletedTodosActionTypes } from '../constants/actionTypes';

const dataServer = 'http://localhost:8032';

export const deleteCompletedTodosActionSuccess = (newTodo) => ({
  type: DeleteCompletedTodosActionTypes.DELETE_COMPLETED_TODOS_SUCCESS,
  payload: newTodo,
});

export const deleteCompletedTodosActionFailure = (error) => ({
  type: DeleteCompletedTodosActionTypes.DELETE_COMPLETED_TODOS_FAILURE,
  payload: { errorMessage: error.message },
});

export const removeCompletedTodos = (todoList) => {
  const url = `${dataServer}/todos/removemany`;
  let newArray = todoList.filter((todo) => todo.completed !== false);
  newArray = newArray.map((todo) => {
    return todo._id;
  });

  return (dispatch) => {
    axios
      .delete(url, { data: { idArray: newArray } })
      .then((response) => handleErros(response))
      .then((response) => {
        dispatch(deleteCompletedTodosActionSuccess(response.data));
        return response;
      })
      .catch((error) => dispatch(deleteCompletedTodosActionFailure(error)));
  };
};

function handleErros(response) {
  if (!response.statusText) {
    throw Error(response.statusText);
  }
  return response;
}
