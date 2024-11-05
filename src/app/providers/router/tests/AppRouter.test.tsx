import { act, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AppRouter } from "..";

jest.mock("@/pages/home", () => () => <div>Home Page</div>);
jest.mock("@/pages/todo", () => () => <div>Todo Page</div>);

describe("AppRouter", () => {
  test("renders without crashing", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <AppRouter />
        </MemoryRouter>
      );
    });
  });

  test("renders Home component on root path", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/"]}>
          <AppRouter />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Home Page/i)).toBeInTheDocument();
  });

  test("renders Todo component on /folders/:folderName path", async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={["/folders/test-folder"]}>
          <AppRouter />
        </MemoryRouter>
      );
    });

    expect(screen.getByText(/Todo Page/i)).toBeInTheDocument();
  });
});
