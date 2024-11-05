import { render, screen } from "@testing-library/react";
import { TodoItem } from "..";

jest.mock("@/features/change-todo-status", () => ({
  ChangeTodoStatus: jest.fn(() => <div>ChangeTodoStatus</div>),
}));

jest.mock("@/features/remove-todo", () => ({
  RemoveTodo: jest.fn(() => <div>RemoveTodo</div>),
}));

describe("TodoItem", () => {
  const todoProps = {
    id: "1",
    text: "Test Todo",
    completed: false,
    folderName: "Test Folder",
  };

  test("renders the todo item with correct text", () => {
    render(<TodoItem {...todoProps} />);

    const todoText = screen.getByText(/Test Todo/i);
    expect(todoText).toBeInTheDocument();
  });

  test("applies completed class when todo is completed", () => {
    const completedProps = { ...todoProps, completed: true };
    render(<TodoItem {...completedProps} />);

    const todoItem = screen.getByText(/Test Todo/i).closest("div");
    expect(todoItem).toHaveClass("todoItem--completed");
  });

  test("does not apply completed class when todo is not completed", () => {
    render(<TodoItem {...todoProps} />);

    const todoItem = screen.getByText(/Test Todo/i).closest("div");
    expect(todoItem).not.toHaveClass("todoItem--completed");
  });

  test("renders ChangeTodoStatus component", () => {
    render(<TodoItem {...todoProps} />);

    expect(screen.getByText(/ChangeTodoStatus/i)).toBeInTheDocument();
  });

  test("renders RemoveTodo component", () => {
    render(<TodoItem {...todoProps} />);

    expect(screen.getByText(/RemoveTodo/i)).toBeInTheDocument();
  });
});
