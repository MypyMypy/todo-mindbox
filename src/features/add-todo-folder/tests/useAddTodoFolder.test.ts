import { renderHook, act } from "@testing-library/react";
import { useAddTodoFolder } from "../model";
import { useAppContext } from "@/app/providers";
import { TodoActions } from "@/shared/reducers/todo";
import {
  ERROR_EMPTY_FIELD,
  ERROR_MAX_LENGTH,
  MAX_TODOFOLDER_TEXT_LENGTH,
} from "../model/constants";

jest.mock("@/app/providers", () => ({
  useAppContext: jest.fn(),
}));

let mockDispatch: jest.Mock;

describe("useAddTodoFolder", () => {
  beforeEach(() => {
    mockDispatch = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        todo: { folders: [], error: "Some error" },
      },
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("initializes with empty folderName", () => {
    const { result } = renderHook(() => useAddTodoFolder());
    expect(result.current.folderName).toBe("");
  });

  test("updates folderName on handleInputChange and clears error", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        todo: {
          folders: [],
          error: "Existing error",
        },
      },
      dispatch: mockDispatch,
    });

    const { result } = renderHook(() => useAddTodoFolder());

    act(() => {
      result.current.handleInputChange({
        target: { value: "New Folder" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    expect(result.current.folderName).toBe("New Folder");
    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.RESET_ERROR,
    });
  });

  test("dispatches error when folderName is empty on submit", () => {
    const { result } = renderHook(() => useAddTodoFolder());

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.SET_ERROR,
      payload: { error: ERROR_EMPTY_FIELD },
    });
  });

  test("dispatches error when folderName exceeds max length", () => {
    const longName = "A".repeat(MAX_TODOFOLDER_TEXT_LENGTH + 1);
    const { result } = renderHook(() => useAddTodoFolder());

    act(() => {
      result.current.handleInputChange({
        target: { value: longName },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.SET_ERROR,
      payload: { error: ERROR_MAX_LENGTH },
    });
  });

  test("dispatches ADD_FOLDER action and clears folderName on valid submit", () => {
    const { result } = renderHook(() => useAddTodoFolder());

    act(() => {
      result.current.handleInputChange({
        target: { value: "Valid Folder" },
      } as React.ChangeEvent<HTMLInputElement>);
    });

    act(() => {
      result.current.handleSubmit({
        preventDefault: jest.fn(),
      } as unknown as React.FormEvent);
    });

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.ADD_FOLDER,
      payload: { name: "Valid Folder" },
    });
    expect(result.current.folderName).toBe("");
  });

  test("clears error on unmount", () => {
    const { unmount } = renderHook(() => useAddTodoFolder());

    unmount();

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.RESET_ERROR,
    });
  });
});
