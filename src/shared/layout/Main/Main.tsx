import styles from "./styles.module.scss";
import { classNamesConcat as cn } from "@/shared/utils/classNames";

interface MainProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  pageClassName?: string;
}

export const Main: React.FC<MainProps> = ({
  children,
  pageClassName,
  ...props
}) => {
  return (
    <main className={styles.main} {...props}>
      <div className={cn(styles.page, pageClassName)}>{children}</div>
    </main>
  );
};
