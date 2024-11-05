import { render, screen, fireEvent } from "@testing-library/react";
import { RemoveTodoFolder } from "..";
import { useAppContext } from "@/app/providers";
import { TodoActions } from "@/shared/reducers/todo";

jest.mock("@/app/providers", () => ({
  useAppContext: jest.fn(),
}));

let mockDispatch: jest.Mock;

describe("RemoveTodoFolder", () => {
  const folderName = "Test Folder";

  beforeEach(() => {
    mockDispatch = jest.fn();
    (useAppContext as jest.Mock).mockReturnValue({ dispatch: mockDispatch });
  });

  test("dispatches REMOVE_FOLDER action with correct payload on button click", () => {
    render(<RemoveTodoFolder folderName={folderName} />);

    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);

    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.REMOVE_FOLDER,
      payload: { name: folderName },
    });
  });

  test("calls onClick prop if provided", () => {
    const onClickMock = jest.fn();
    render(<RemoveTodoFolder folderName={folderName} onClick={onClickMock} />);

    const button = screen.getByRole("button", { name: /delete/i });
    fireEvent.click(button);

    expect(onClickMock).toHaveBeenCalled();
    expect(mockDispatch).toHaveBeenCalledWith({
      type: TodoActions.REMOVE_FOLDER,
      payload: { name: folderName },
    });
  });

  test("renders with default text if children not provided", () => {
    render(<RemoveTodoFolder folderName={folderName} />);

    expect(screen.getByRole("button", { name: /delete/i })).toBeInTheDocument();
  });

  test("renders with custom text if children are provided", () => {
    render(
      <RemoveTodoFolder folderName={folderName}>Remove Folder</RemoveTodoFolder>
    );

    expect(
      screen.getByRole("button", { name: /remove folder/i })
    ).toBeInTheDocument();
  });
});
