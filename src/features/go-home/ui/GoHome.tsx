import { Link } from "react-router-dom";
import { GoHomeProps } from "./GoHome.props";

export const GoHome: React.FC<GoHomeProps> = ({ children, ...props }) => {
  return (
    <Link {...props} to={"/"}>
      {children || "<<< Home <<<"}
    </Link>
  );
};
