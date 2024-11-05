import { Link } from "react-router-dom";

export const OpenTodoPage: React.FC<{
  folderName: string;
  children?: React.ReactNode;
}> = ({ children, folderName }) => {
  return (
    <Link to={`/folders/${folderName}`}>
      {children || `Open ${folderName} folder page`}
    </Link>
  );
};
