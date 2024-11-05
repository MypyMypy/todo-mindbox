import React from "react";

import { TodoItem } from "@/entities/todo";
import { AddTodo } from "@/features/add-todo";
import { FilterTodoList } from "@/features/filter-todo-list";

import { useFilteredTodos } from "../model";
import { TodoListProps } from "./TodoList.props";
import styles from "./styles.module.scss";

export const TodoList: React.FC<TodoListProps> = ({ folderName }) => {
  const { filter, todos, filteredTodos, setFilter } =
    useFilteredTodos(folderName);

  if (!folderName) return <h3>Folder not Found</h3>;

  return (
    <div className={styles.todoListWrapper}>
      <AddTodo folderName={folderName} />

      {filteredTodos.length > 0 ? (
        <ul className={styles.todoList}>
          {filteredTodos.map((item) => (
            <li className={styles.todoList__item} key={item.id}>
              <TodoItem {...item} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noTodos}>Here will be your Todos...</p>
      )}

      {todos.length > 0 && (
        <FilterTodoList
          currentFilter={filter}
          showActive={() => setFilter("active")}
          showCompleted={() => setFilter("completed")}
          showAll={() => setFilter("all")}
        />
      )}
    </div>
  );
};
