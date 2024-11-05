import { useAppContext } from "@/app/providers";
import { useAddTodoFolder } from "../model";

import styles from "./styles.module.scss";

export const AddTodoFolder: React.FC = () => {
  const { folderName, handleInputChange, handleSubmit } = useAddTodoFolder();

  const { state } = useAppContext();

  return (
    <form onSubmit={handleSubmit} className={styles.addTodoFolder}>
      {state.todo.error && <p className={styles.error}>{state.todo.error}</p>}
      <input
        type="text"
        value={folderName}
        onChange={handleInputChange}
        placeholder="Enter folder name"
        className="add-todo-folder__input"
      />
      <button type="submit" className="add-todo-folder__button">
        Add Folder
      </button>
    </form>
  );
};
