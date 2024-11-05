import { render, screen } from "@testing-library/react";
import { AppContextProvider } from "@/app/providers";
import { TodoFolderList } from "..";
import { AppContextI } from "@/app/providers/context/appContext.types";
import { MemoryRouter } from "react-router";

const renderWithContext = (state: AppContextI) => {
  return render(
    <MemoryRouter>
      <AppContextProvider initialValues={state}>
        <TodoFolderList />
      </AppContextProvider>
    </MemoryRouter>
  );
};

describe("TodoFolderList", () => {
  test("renders list of folders when they exist", async () => {
    const mockState: AppContextI = {
      todo: {
        folders: [
          { name: "Folder 1", todos: [] },
          { name: "Folder 2", todos: [] },
        ],
        error: null,
      },
    };

    renderWithContext(mockState);

    expect(screen.getByText(/Folder 1/i)).toBeInTheDocument();
    expect(screen.getByText(/Folder 2/i)).toBeInTheDocument();
  });

  test("renders no folders message when there are no folders", () => {
    const mockState = {
      todo: {
        folders: [],
        error: null,
      },
    };

    renderWithContext(mockState);

    expect(
      screen.getByText(/Here will be your folders.../i)
    ).toBeInTheDocument();
  });
});
