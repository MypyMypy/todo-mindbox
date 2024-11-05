import { useAppContext } from "@/app/providers";
import { RemoveTodoFolderProps } from "./RemoveTodoFolder.props";
import { TodoActions } from "@/shared/reducers/todo";

export const RemoveTodoFolder: React.FC<RemoveTodoFolderProps> = ({
  folderName,
  ...props
}) => {
  const { dispatch } = useAppContext();

  const handleButtunClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (props.onClick) props.onClick(event);

    dispatch({
      type: TodoActions.REMOVE_FOLDER,
      payload: { name: folderName },
    });
  };

  return (
    <button {...props} type="button" onClick={handleButtunClick}>
      {props.children || "Delete"}
    </button>
  );
};
