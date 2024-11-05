import styles from "./styles.module.scss";
import { classNamesConcat as cn } from "@/shared/utils/classNames";

interface SectionProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLElement>,
    HTMLElement
  > {
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  containerClassName,
  ...props
}) => {
  return (
    <section {...props}>
      <div className={cn(styles.container, containerClassName)}>{children}</div>
    </section>
  );
};
