import { classNamesConcat as cn } from "@/shared/utils/classNames";

import { FilterTodoListProps } from "./FilterTodoList.props";
import styles from "./styles.module.scss";

export const FilterTodoList: React.FC<FilterTodoListProps> = ({
  currentFilter,
  showActive,
  showAll,
  showCompleted,
  className,
  ...props
}) => {
  const renderFilterButton = (
    label: string,
    isActive: boolean,
    onClick: () => void
  ) => (
    <button
      className={cn(styles.filterButton, {
        [styles["filterButton--active"]]: isActive,
      })}
      type="button"
      onClick={onClick}
    >
      {label}
    </button>
  );

  return (
    <div className={cn(className, styles.filtersWrapper)} {...props}>
      {showAll && renderFilterButton("All", currentFilter === "all", showAll)}
      {showActive &&
        renderFilterButton("Active", currentFilter === "active", showActive)}
      {showCompleted &&
        renderFilterButton(
          "Completed",
          currentFilter === "completed",
          showCompleted
        )}
    </div>
  );
};
