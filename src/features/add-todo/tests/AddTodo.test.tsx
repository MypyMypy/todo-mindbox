import { render, screen, fireEvent } from "@testing-library/react";
import { AddTodo } from "..";
import { useAppContext } from "@/app/providers";
import { TodoActions } from "@/shared/reducers/todo";
import { useAddTodo } from "../model";

jest.mock("../model", () => ({
  useAddTodo: jest.fn(),
}));

jest.mock("@/app/providers", () => ({
  useAppContext: jest.fn(),
}));

describe("AddTodo Component", () => {
  const mockDispatch = jest.fn();
  const folderName = "Test Folder";

  beforeEach(() => {
    jest.clearAllMocks();
    (useAppContext as jest.Mock).mockReturnValue({
      state: { todo: { error: null } },
      dispatch: mockDispatch,
    });
  });

  test("renders AddTodo component and displays error if present", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: { todo: { error: "Test Error" } },
      dispatch: mockDispatch,
    });
    (useAddTodo as jest.Mock).mockReturnValue({
      todoName: "",
      handleInputChange: jest.fn(),
      handleSubmit: jest.fn(),
    });

    render(<AddTodo folderName={folderName} />);

    expect(screen.getByText("Test Error")).toBeInTheDocument();
  });

  test("updates todoName on input change", () => {
    const mockHandleInputChange = jest.fn();
    (useAddTodo as jest.Mock).mockReturnValue({
      todoName: "",
      handleInputChange: mockHandleInputChange,
      handleSubmit: jest.fn(),
    });

    render(<AddTodo folderName={folderName} />);
    const input = screen.getByPlaceholderText("Enter Todo name");
    fireEvent.change(input, { target: { value: "New Todo" } });

    expect(mockHandleInputChange).toHaveBeenCalled();
  });

  test("displays error when form is submitted with an empty input", () => {
    (useAddTodo as jest.Mock).mockImplementation(() => {
      return {
        todoName: "",
        handleInputChange: jest.fn(),
        handleSubmit: (e: React.FormEvent) => {
          e.preventDefault();
          mockDispatch({
            type: TodoActions.SET_ERROR,
            payload: { error: "Field cannot be empty" },
          });
        },
      };
    });

    render(<AddTodo folderName={folderName} />);
    fireEvent.submit(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.SET_ERROR,
      payload: { error: "Field cannot be empty" },
    });
  });

  test("displays error when input exceeds max length", () => {
    const longText = "a".repeat(100);
    (useAddTodo as jest.Mock).mockImplementation(() => ({
      todoName: longText,
      handleInputChange: jest.fn(),
      handleSubmit: (e: React.FormEvent) => {
        e.preventDefault();
        mockDispatch({
          type: TodoActions.SET_ERROR,
          payload: { error: "Text exceeds max length" },
        });
      },
    }));

    render(<AddTodo folderName={folderName} />);
    fireEvent.submit(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.SET_ERROR,
      payload: { error: "Text exceeds max length" },
    });
  });

  test("adds todo and clears input on valid submit", () => {
    (useAddTodo as jest.Mock).mockImplementation(() => ({
      todoName: "New Todo",
      handleInputChange: jest.fn(),
      handleSubmit: (e: React.FormEvent) => {
        e.preventDefault();
        mockDispatch({
          type: TodoActions.ADD_TODO,
          payload: { folderName, text: "New Todo" },
        });
      },
    }));

    render(<AddTodo folderName={folderName} />);
    fireEvent.submit(screen.getByRole("button"));

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.ADD_TODO,
      payload: { folderName, text: "New Todo" },
    });
  });
});
