import { Todo } from "@/entities/todo";
import { TodoFolderI } from "@/entities/todo-folder";
import { ActionMap } from "@/shared/types/@utility/ActionMap";

export const enum TodoActions {
  ADD_FOLDER = "ADD_FOLDER",
  ADD_TODO = "ADD_TODO",
  REMOVE_FOLDER = "REMOVE_FOLDER",
  REMOVE_TODO = "REMOVE_TODO",
  TOGGLE_TODO_STATUS = "TOGGLE_TODO_STATUS",
  SET_ERROR = "SET_ERROR",
  RESET_ERROR = "RESET_ERROR",
}

interface TodoPayload {
  [TodoActions.ADD_FOLDER]: {
    name: TodoFolderI["name"];
  };
  [TodoActions.REMOVE_FOLDER]: {
    name: TodoFolderI["name"];
  };

  [TodoActions.ADD_TODO]: {
    text: Todo["text"];
    folderName: Todo["folderName"];
  };
  [TodoActions.REMOVE_TODO]: {
    id: Todo["id"];
  };
  [TodoActions.TOGGLE_TODO_STATUS]: {
    id: Todo["id"];
  };

  [TodoActions.SET_ERROR]: {
    error: string;
  };
  [TodoActions.RESET_ERROR]: undefined;
}

export type TodoActionsT = ActionMap<TodoPayload>[keyof ActionMap<TodoPayload>];

export interface TodoReducerI {
  folders: TodoFolderI[];
  error: string | null;
}
