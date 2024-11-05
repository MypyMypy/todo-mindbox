import { TodoActions } from "@/shared/reducers/todo";
import { useAppContext } from "@/app/providers";
import { useCallback, useEffect, useState } from "react";

import {
  ERROR_EMPTY_FIELD,
  ERROR_MAX_LENGTH,
  MAX_TODOFOLDER_TEXT_LENGTH,
} from "./constants";

export const useAddTodoFolder = () => {
  const { state, dispatch } = useAppContext();
  const [folderName, setFolderName] = useState("");

  const clearError = useCallback(() => {
    if (state.todo.error) {
      dispatch({ type: TodoActions.RESET_ERROR });
    }
  }, [dispatch, state.todo.error]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
    clearError();
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    clearError();

    if (!folderName) {
      dispatch({
        type: TodoActions.SET_ERROR,
        payload: { error: ERROR_EMPTY_FIELD },
      });
      return;
    }

    if (folderName.length > MAX_TODOFOLDER_TEXT_LENGTH) {
      dispatch({
        type: TodoActions.SET_ERROR,
        payload: { error: ERROR_MAX_LENGTH },
      });
      return;
    }

    dispatch({
      type: TodoActions.ADD_FOLDER,
      payload: { name: folderName },
    });
    setFolderName("");
  };

  useEffect(() => {
    return () => clearError();
  }, [clearError]);

  return {
    folderName,
    handleInputChange,
    handleSubmit,
  };
};
