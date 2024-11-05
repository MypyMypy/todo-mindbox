import { render, screen, fireEvent } from "@testing-library/react";
import { TodoList } from "..";
import { useFilteredTodos } from "../model";

jest.mock("../model", () => ({
  useFilteredTodos: jest.fn(),
}));

jest.mock("@/entities/todo", () => ({
  TodoItem: jest.fn(() => <div>Mocked TodoItem</div>),
}));

jest.mock("@/features/add-todo", () => ({
  AddTodo: jest.fn(() => <div>Mocked AddTodo</div>),
}));

jest.mock("@/features/filter-todo-list", () => ({
  FilterTodoList: jest.fn(() => <div>Mocked FilterTodoList</div>),
}));

const mockSetFilter = jest.fn();

describe("TodoList", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (useFilteredTodos as jest.Mock).mockReturnValue({
      filter: "all",
      todos: [],
      filteredTodos: [],
      setFilter: mockSetFilter,
    });
  });

  test("renders 'Folder not Found' message when folderName is not provided", () => {
    render(<TodoList folderName={undefined} />);

    expect(screen.getByText("Folder not Found")).toBeInTheDocument();
  });

  test("renders AddTodo component and 'Here will be your Todos...' message when no todos", () => {
    render(<TodoList folderName="Test Folder" />);

    expect(screen.getByText("Mocked AddTodo")).toBeInTheDocument();
    expect(screen.getByText("Here will be your Todos...")).toBeInTheDocument();
  });

  test("renders list of filtered todos when filteredTodos are present", () => {
    (useFilteredTodos as jest.Mock).mockReturnValue({
      filter: "all",
      todos: [
        {
          id: 1,
          text: "Test Todo",
          completed: false,
          folderName: "Test Folder",
        },
      ],
      filteredTodos: [
        {
          id: 1,
          text: "Test Todo",
          completed: false,
          folderName: "Test Folder",
        },
      ],
      setFilter: mockSetFilter,
    });

    render(<TodoList folderName="Test Folder" />);

    expect(screen.getByText("Mocked AddTodo")).toBeInTheDocument();
    expect(screen.getByText("Mocked TodoItem")).toBeInTheDocument();
  });

  test("renders FilterTodoList when there are todos", () => {
    (useFilteredTodos as jest.Mock).mockReturnValue({
      filter: "all",
      todos: [
        {
          id: 1,
          text: "Test Todo",
          completed: false,
          folderName: "Test Folder",
        },
      ],
      filteredTodos: [
        {
          id: 1,
          text: "Test Todo",
          completed: false,
          folderName: "Test Folder",
        },
      ],
      setFilter: mockSetFilter,
    });

    render(<TodoList folderName="Test Folder" />);

    expect(screen.getByText("Mocked FilterTodoList")).toBeInTheDocument();
  });

  test("calls setFilter with 'active', 'completed', and 'all' when FilterTodoList buttons are clicked", () => {
    (useFilteredTodos as jest.Mock).mockReturnValue({
      filter: "all",
      todos: [
        {
          id: 1,
          text: "Test Todo",
          completed: false,
          folderName: "Test Folder",
        },
      ],
      filteredTodos: [
        {
          id: 1,
          text: "Test Todo",
          completed: false,
          folderName: "Test Folder",
        },
      ],
      setFilter: mockSetFilter,
    });

    render(<TodoList folderName="Test Folder" />);

    const filterComponent = screen.getByText("Mocked FilterTodoList");
    fireEvent.click(filterComponent);

    mockSetFilter("active");
    mockSetFilter("completed");
    mockSetFilter("all");

    expect(mockSetFilter).toHaveBeenCalledWith("active");
    expect(mockSetFilter).toHaveBeenCalledWith("completed");
    expect(mockSetFilter).toHaveBeenCalledWith("all");
  });
});
