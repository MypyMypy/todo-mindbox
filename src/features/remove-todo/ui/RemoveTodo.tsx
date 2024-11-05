import { useAppContext } from "@/app/providers";
import { RemoveTodoProps } from "./RemoveTodo.props";
import { TodoActions } from "@/shared/reducers/todo";

export const RemoveTodo: React.FC<RemoveTodoProps> = ({ todoId, ...props }) => {
  const { dispatch } = useAppContext();

  const handleButtunClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (props.onClick) props.onClick(event);
    dispatch({
      type: TodoActions.REMOVE_TODO,
      payload: { id: todoId },
    });
  };

  return (
    <button {...props} type="button" onClick={handleButtunClick}>
      {props.children || "Remove"}
    </button>
  );
};
