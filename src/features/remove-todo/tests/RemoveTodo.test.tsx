import { render, screen, fireEvent } from "@testing-library/react";
import { RemoveTodo } from "..";
import { useAppContext } from "@/app/providers";
import { TodoActions } from "@/shared/reducers/todo";

// Мокаем контекст приложения
jest.mock("@/app/providers", () => ({
  useAppContext: jest.fn(),
}));

describe("RemoveTodo", () => {
  const mockDispatch = jest.fn();

  beforeEach(() => {
    (useAppContext as jest.Mock).mockReturnValue({
      dispatch: mockDispatch,
    });
  });

  afterEach(() => {
    jest.clearAllMocks(); // Сбрасываем моки после каждого теста
  });

  test("renders the button with default text", () => {
    render(<RemoveTodo todoId="1" />);

    const button = screen.getByRole("button", { name: /remove/i });
    expect(button).toBeInTheDocument();
  });

  test("renders the button with custom text", () => {
    render(<RemoveTodo todoId="1">Custom Remove</RemoveTodo>);

    const button = screen.getByRole("button", { name: /custom remove/i });
    expect(button).toBeInTheDocument();
  });

  test("dispatches the correct action on button click", () => {
    render(<RemoveTodo todoId="1" />);

    const button = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.REMOVE_TODO,
      payload: { id: "1" },
    });
  });

  test("calls onClick prop when button is clicked", () => {
    const handleClick = jest.fn();
    render(<RemoveTodo todoId="1" onClick={handleClick} />);

    const button = screen.getByRole("button", { name: /remove/i });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
