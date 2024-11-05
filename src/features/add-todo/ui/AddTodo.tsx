import { useAppContext } from "@/app/providers";
import { useAddTodo } from "../model";

import styles from "./styles.module.scss";

export const AddTodo: React.FC<{ folderName: string }> = ({ folderName }) => {
  const { todoName, handleInputChange, handleSubmit } = useAddTodo(folderName);

  const { state } = useAppContext();

  return (
    <form onSubmit={handleSubmit} className={styles.addToDo}>
      {state.todo.error && <p className={styles.error}>{state.todo.error}</p>}
      <input
        type="text"
        value={todoName}
        onChange={handleInputChange}
        placeholder="Enter Todo name"
      />
      <button type="submit">Add ToDo</button>
    </form>
  );
};
