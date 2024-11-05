import { render, screen, fireEvent } from "@testing-library/react";
import { AddTodoFolder } from "..";
import { useAppContext } from "@/app/providers";
import { TodoActions } from "@/shared/reducers/todo";

jest.mock("@/app/providers", () => ({
  ...jest.requireActual("@/app/providers"),
  useAppContext: jest.fn(),
}));

describe("AddTodoFolder", () => {
  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        todo: {
          folders: [],
          error: null,
        },
      },
      dispatch: jest.fn(),
    });
  });

  test("renders AddTodoFolder component", () => {
    render(<AddTodoFolder />);

    expect(
      screen.getByPlaceholderText(/Enter folder name/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /add folder/i })
    ).toBeInTheDocument();
  });

  test("handles input change", () => {
    render(<AddTodoFolder />);

    const input = screen.getByPlaceholderText(/Enter folder name/i);
    fireEvent.change(input, { target: { value: "New Folder" } });

    expect(input).toHaveValue("New Folder");
  });

  test("displays error when trying to add an empty folder", () => {
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        todo: {
          folders: [],
          error: "Folder name cannot be empty",
        },
      },
      dispatch: jest.fn(),
    });

    render(<AddTodoFolder />);

    const button = screen.getByRole("button", { name: /add folder/i });
    fireEvent.click(button);

    expect(
      screen.getByText(/Folder name cannot be empty/i)
    ).toBeInTheDocument();
  });

  test("successfully adds a folder", () => {
    const mockDispatch = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({
      state: {
        todo: {
          folders: [],
          error: null,
        },
      },
      dispatch: mockDispatch,
    });

    render(<AddTodoFolder />);

    const input = screen.getByPlaceholderText(/Enter folder name/i);
    fireEvent.change(input, { target: { value: "New Folder" } });

    const button = screen.getByRole("button", { name: /add folder/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.ADD_FOLDER,
      payload: { name: "New Folder" },
    });
  });
});
