import { renderHook } from "@testing-library/react";
import { AppContext } from "@/app/providers/context/appContext";
import { useFilteredTodos } from "../model";
import { ReactNode } from "react";

const mockState = {
  todo: {
    folders: [{ name: "Test Folder", todos: [] }],
    error: null,
  },
};

interface WrapperProps {
  children: ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ children }) => (
  <AppContext.Provider value={{ state: mockState, dispatch: jest.fn() }}>
    {children}
  </AppContext.Provider>
);

test("should return initial state", () => {
  const { result } = renderHook(() => useFilteredTodos("Test Folder"), {
    wrapper: Wrapper,
  });

  expect(result.current.filter).toBe("all");
  expect(result.current.todos).toEqual([]);
  expect(result.current.filteredTodos).toEqual([]);
});
