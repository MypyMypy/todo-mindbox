import { Todo } from "@/entities/todo";
import { TodoActions, TodoActionsT, TodoReducerI } from "./todoReducer.types";

import { TodoFolderI } from "@/entities/todo-folder";
import { LocalStorageSetItem } from "@/shared/localStorage/localStorageUtils";
import { generateUniqueId } from "@/shared/utils/generateUniqueId";

export const todoReducer = (
  state: TodoReducerI,
  action: TodoActionsT
): TodoReducerI => {
  switch (action.type) {
    case TodoActions.ADD_FOLDER:
      try {
        if (state.folders.find((folder) => folder.name === action.payload.name))
          return { ...state, error: "Folders must have unique names" };

        const newFolder: TodoFolderI = {
          name: action.payload.name,
          todos: [],
        };

        const updatedFolders: TodoFolderI[] = [...state.folders, newFolder];
        LocalStorageSetItem("todo", updatedFolders);

        return { ...state, folders: updatedFolders };
      } catch (error) {
        console.error("Failed to add todo folder to localStorage:", error);
      }

      return state;
    case TodoActions.REMOVE_FOLDER: {
      const updatedFolders = state.folders.filter(
        (folder) => folder.name !== action.payload.name
      );

      LocalStorageSetItem("todo", updatedFolders);

      return { ...state, folders: updatedFolders };
    }
    case TodoActions.ADD_TODO: {
      const id = generateUniqueId();

      const updatedFolders: TodoFolderI[] = state.folders.map((folder) => {
        if (folder.name === action.payload.folderName) {
          const newTodo: Todo = { ...action.payload, id, completed: false };

          return {
            ...folder,
            todos: [...folder.todos, newTodo],
          };
        }

        return folder;
      });

      LocalStorageSetItem("todo", updatedFolders);
      return {
        ...state,
        folders: updatedFolders,
      };
    }
    case TodoActions.TOGGLE_TODO_STATUS: {
      const updatedFolders: TodoFolderI[] = state.folders.map((folder) => {
        const todoCurrentIndex = folder.todos.findIndex(
          (todo) => action.payload.id === todo.id
        );

        if (todoCurrentIndex !== -1) {
          const updatedTodos = folder.todos.map((todo, index) =>
            index === todoCurrentIndex
              ? { ...todo, completed: !todo.completed }
              : todo
          );

          return {
            ...folder,
            todos: updatedTodos,
          };
        }

        return folder;
      });

      LocalStorageSetItem("todo", updatedFolders);
      return {
        ...state,
        folders: updatedFolders,
      };
    }

    case TodoActions.REMOVE_TODO: {
      const updatedFolders: TodoFolderI[] = state.folders.map((folder) => {
        const todoCurrentIndex = folder.todos.findIndex(
          (todo) => action.payload.id === todo.id
        );

        if (todoCurrentIndex !== -1) {
          const updatedFoldersTodo = folder.todos.filter(
            (todo) => todo.id !== action.payload.id
          );

          return {
            ...folder,
            todos: updatedFoldersTodo,
          };
        }

        return folder;
      });

      LocalStorageSetItem("todo", updatedFolders);

      return {
        ...state,
        folders: updatedFolders,
      };
    }

    case TodoActions.SET_ERROR: {
      return { ...state, error: action.payload.error };
    }
    case TodoActions.RESET_ERROR: {
      return { ...state, error: null };
    }
    default: {
      return state;
    }
  }
};
