import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { FilterTodoList, FilterTodoType } from "..";
import { FilterTodoListProps } from "../ui/FilterTodoList.props";

describe("FilterTodoList Component", () => {
  const mockShowAll = jest.fn();
  const mockShowActive = jest.fn();
  const mockShowCompleted = jest.fn();

  const renderComponent = (currentFilter: FilterTodoType) => {
    const props: FilterTodoListProps = {
      currentFilter,
      showAll: mockShowAll,
      showActive: mockShowActive,
      showCompleted: mockShowCompleted,
    };

    render(<FilterTodoList {...props} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders all filter buttons", () => {
    renderComponent("all");

    expect(screen.getByText("All")).toBeInTheDocument();
    expect(screen.getByText("Active")).toBeInTheDocument();
    expect(screen.getByText("Completed")).toBeInTheDocument();
  });

  test("calls the correct filter function on button click", () => {
    renderComponent("all");

    fireEvent.click(screen.getByText("All"));
    fireEvent.click(screen.getByText("Active"));
    fireEvent.click(screen.getByText("Completed"));

    expect(mockShowAll).toHaveBeenCalledTimes(1);
    expect(mockShowActive).toHaveBeenCalledTimes(1);
    expect(mockShowCompleted).toHaveBeenCalledTimes(1);
  });

  test("sets the correct button as active based on current filter", () => {
    renderComponent("active");

    const activeButton = screen.getByRole("button", { name: "Active" });
    const allButton = screen.getByRole("button", { name: "All" });
    const completedButton = screen.getByRole("button", { name: "Completed" });

    expect(activeButton).toHaveClass("filterButton--active");
    expect(allButton).not.toHaveClass("filterButton--active");
    expect(completedButton).not.toHaveClass("filterButton--active");

    cleanup();

    renderComponent("completed");

    expect(screen.getByRole("button", { name: "Completed" })).toHaveClass(
      "filterButton--active"
    );
    expect(screen.getByRole("button", { name: "Active" })).not.toHaveClass(
      "filterButton--active"
    );
  });
});
