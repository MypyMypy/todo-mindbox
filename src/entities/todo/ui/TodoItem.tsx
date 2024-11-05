import { classNamesConcat as cn } from "@/shared/utils/classNames";
import { RemoveTodo } from "@/features/remove-todo";
import { TodoItemProps } from "./TodoItem.props";

import styles from "./styles.module.scss";
import { ChangeTodoStatus } from "@/features/change-todo-status";

export const TodoItem: React.FC<TodoItemProps> = ({ id, completed, text }) => {
  return (
    <div
      className={cn(styles.todoItem, {
        [styles["todoItem--completed"]]: completed,
      })}
    >
      <ChangeTodoStatus className={styles.checkbox} todoId={id} />
      <h4 className={styles.todoText}>
        <span>{text}</span>
      </h4>
      <RemoveTodo todoId={id} />
    </div>
  );
};
