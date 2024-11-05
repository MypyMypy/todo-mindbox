import { todoReducer } from "../todoReducer";
import { TodoActions, TodoActionsT, TodoReducerI } from "../todoReducer.types";

describe("todoReducer", () => {
  const initialState: TodoReducerI = {
    folders: [],
    error: null,
  };

  it("should return the initial state", () => {
    expect(
      todoReducer(initialState, {
        type: "UNKNOWN" as TodoActions,
      } as TodoActionsT)
    ).toEqual(initialState);
  });

  it("should handle ADD_FOLDER", () => {
    const action: TodoActionsT = {
      type: TodoActions.ADD_FOLDER,
      payload: { name: "New Folder" },
    };
    const expectedState = {
      folders: [{ name: "New Folder", todos: [] }],
      error: null,
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it("should not allow duplicate folder names", () => {
    const existingState = {
      folders: [{ name: "Existing Folder", todos: [] }],
      error: null,
    };
    const action: TodoActionsT = {
      type: TodoActions.ADD_FOLDER,
      payload: { name: "Existing Folder" },
    };
    const expectedState = {
      ...existingState,
      error: "Folders must have unique names",
    };

    expect(todoReducer(existingState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_FOLDER", () => {
    const existingState = {
      folders: [
        { name: "Folder to Remove", todos: [] },
        { name: "Another Folder", todos: [] },
      ],
      error: null,
    };
    const action: TodoActionsT = {
      type: TodoActions.REMOVE_FOLDER,
      payload: { name: "Folder to Remove" },
    };
    const expectedState = {
      folders: [{ name: "Another Folder", todos: [] }],
      error: null,
    };

    expect(todoReducer(existingState, action)).toEqual(expectedState);
  });

  it("should handle ADD_TODO", () => {
    const existingState = {
      folders: [{ name: "Folder", todos: [] }],
      error: null,
    };

    const action: TodoActionsT = {
      type: TodoActions.ADD_TODO,
      payload: { folderName: "Folder", text: "New Todo" },
    };

    const newState = todoReducer(existingState, action);
    expect(newState.folders[0].todos.length).toBe(1);
    expect(newState.folders[0].todos[0]).toMatchObject({
      text: "New Todo",
      completed: false,
    });
  });

  it("should handle TOGGLE_TODO_STATUS", () => {
    const existingState: TodoReducerI = {
      folders: [
        {
          name: "Folder",
          todos: [
            {
              id: "1",
              folderName: "New Folder",
              text: "Todo",
              completed: false,
            },
          ],
        },
      ],
      error: null,
    };
    const action: TodoActionsT = {
      type: TodoActions.TOGGLE_TODO_STATUS,
      payload: { id: "1" },
    };
    const expectedState = {
      folders: [
        {
          name: "Folder",
          todos: [
            {
              id: "1",
              folderName: "New Folder",
              text: "Todo",
              completed: true,
            },
          ],
        },
      ],
      error: null,
    };

    expect(todoReducer(existingState, action)).toEqual(expectedState);
  });

  it("should handle REMOVE_TODO", () => {
    const existingState: TodoReducerI = {
      folders: [
        {
          name: "Folder",
          todos: [
            { id: "1", text: "Todo 1", completed: false, folderName: "Folder" },
            { id: "2", text: "Todo 2", completed: false, folderName: "Folder" },
          ],
        },
      ],
      error: null,
    };

    const action: TodoActionsT = {
      type: TodoActions.REMOVE_TODO,
      payload: { id: "1" },
    };

    const expectedState = {
      folders: [
        {
          name: "Folder",
          todos: [
            { id: "2", text: "Todo 2", completed: false, folderName: "Folder" },
          ],
        },
      ],
      error: null,
    };

    expect(todoReducer(existingState, action)).toEqual(expectedState);
  });

  it("should handle SET_ERROR", () => {
    const action: TodoActionsT = {
      type: TodoActions.SET_ERROR,
      payload: { error: "An error occurred" },
    };
    const expectedState = {
      folders: [],
      error: "An error occurred",
    };

    expect(todoReducer(initialState, action)).toEqual(expectedState);
  });

  it("should handle RESET_ERROR", () => {
    const existingState = {
      folders: [],
      error: "An error occurred",
    };
    const action: TodoActionsT = {
      type: TodoActions.RESET_ERROR,
    };
    const expectedState = {
      folders: [],
      error: null,
    };

    expect(todoReducer(existingState, action)).toEqual(expectedState);
  });
});
