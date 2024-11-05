import { useCallback, useMemo, useState } from "react";

import { useAppContext } from "@/app/providers";
import { Todo } from "@/entities/todo";
import { FilterTodoType } from "@/features/filter-todo-list";

export const useFilteredTodos = (folderName: string | undefined) => {
  const { state } = useAppContext();
  const [filter, setFilter] = useState<FilterTodoType>("all");

  const todos = useMemo(() => {
    return (
      state.todo.folders.find((folder) => folder.name === folderName)?.todos ||
      []
    );
  }, [state.todo.folders, folderName]);

  const filterHandler = useCallback(
    (todo: Todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "active") return !todo.completed;
      return true;
    },
    [filter]
  );

  const filteredTodos = useMemo(
    () => todos.filter(filterHandler),
    [todos, filterHandler]
  );

  return { filter, todos, filteredTodos, setFilter };
};
