import { render, screen, fireEvent } from "@testing-library/react";
import { ChangeTodoStatus } from "..";
import { useAppContext } from "@/app/providers";
import { TodoActions } from "@/shared/reducers/todo";

jest.mock("@/app/providers", () => ({
  useAppContext: jest.fn(),
}));

describe("ChangeTodoStatus", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders the button with default text", () => {
    render(<ChangeTodoStatus todoId="1" />);

    const button = screen.getByRole("button", { name: /change status/i });
    expect(button).toBeInTheDocument();
  });

  test("renders the button with custom text", () => {
    render(<ChangeTodoStatus todoId="1">Custom Text</ChangeTodoStatus>);

    const button = screen.getByRole("button", { name: /custom text/i });
    expect(button).toBeInTheDocument();
  });

  test("dispatches the correct action on button click", () => {
    render(<ChangeTodoStatus todoId="1" />);

    const button = screen.getByRole("button", { name: /change status/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.TOGGLE_TODO_STATUS,
      payload: { id: "1" },
    });
  });

  test("calls onClick prop when button is clicked", () => {
    const handleClick = jest.fn();
    render(<ChangeTodoStatus todoId="1" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /change status/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
