import { RemoveTodoFolder } from "@/features/remove-todo-folder";
import { TodoFolderProps } from "./TodoFolderProps";
import { OpenTodoPage } from "@/features/open-todo-page";

import styles from "./styles.module.scss";

export const TodoFolder: React.FC<TodoFolderProps> = ({ name, todos }) => {
  return (
    <div className={styles.todoFolder}>
      <span className={styles.count}>Count: {todos?.length || 0}</span>
      <OpenTodoPage folderName={name}>
        <h3>{name}</h3>
      </OpenTodoPage>
      <RemoveTodoFolder folderName={name} />
    </div>
  );
};
