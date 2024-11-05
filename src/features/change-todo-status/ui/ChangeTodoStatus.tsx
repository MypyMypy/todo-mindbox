import { useAppContext } from "@/app/providers";
import { ChangeTodoStatusProps } from "./ChangeTodoStatus.props";
import { TodoActions } from "@/shared/reducers/todo";

export const ChangeTodoStatus: React.FC<ChangeTodoStatusProps> = ({
  todoId,
  ...props
}) => {
  const { dispatch } = useAppContext();

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (props.onClick) props.onClick(event);
    dispatch({ type: TodoActions.TOGGLE_TODO_STATUS, payload: { id: todoId } });
  };

  return (
    <button onClick={handleClick} type="button" {...props}>
      {props.children || "Change status"}
    </button>
  );
};
