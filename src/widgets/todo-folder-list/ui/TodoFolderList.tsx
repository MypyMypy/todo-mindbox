import React from "react";
import { AddTodoFolder } from "@/features/add-todo-folder";
import { useAppContext } from "@/app/providers";
import { TodoFolder } from "@/entities/todo-folder";

import styles from "./styles.module.scss";

export const TodoFolderList: React.FC = () => {
  const { state } = useAppContext();

  return (
    <div>
      <AddTodoFolder />
      {state.todo.folders?.length > 0 ? (
        <ul className={styles.todoFolderList}>
          {state.todo.folders.map((item) => (
            <li className={styles.todoFolderList__item} key={item.name}>
              <TodoFolder name={item.name} todos={item.todos} />
            </li>
          ))}
        </ul>
      ) : (
        <p className={styles.noFolderLabel}>Here will be your folders...</p>
      )}
    </div>
  );
};
