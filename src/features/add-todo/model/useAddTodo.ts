import { useCallback, useEffect, useState } from "react";
import { TodoActions } from "@/shared/reducers/todo";
import { useAppContext } from "@/app/providers";

import {
  MAX_TODO_TEXT_LENGTH,
  ERROR_MAX_LENGTH,
  ERROR_EMPTY_FIELD,
} from "./contsants";

export const useAddTodo = (folderName: string) => {
  const { state, dispatch } = useAppContext();
  const [todoName, setTodoName] = useState("");

  const clearError = useCallback(() => {
    if (state.todo.error) {
      dispatch({ type: TodoActions.RESET_ERROR });
    }
  }, [dispatch, state.todo.error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTodoName(event.target.value);
    clearError();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearError();

    if (!todoName) {
      dispatch({
        type: TodoActions.SET_ERROR,
        payload: { error: ERROR_EMPTY_FIELD },
      });
      return;
    }

    if (todoName.length > MAX_TODO_TEXT_LENGTH) {
      dispatch({
        type: TodoActions.SET_ERROR,
        payload: { error: ERROR_MAX_LENGTH },
      });
      return;
    }

    dispatch({
      type: TodoActions.ADD_TODO,
      payload: { folderName, text: todoName },
    });
    setTodoName("");
  };

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  return {
    todoName,
    handleInputChange,
    handleSubmit,
  };
};
