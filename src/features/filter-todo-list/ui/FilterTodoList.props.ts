import { FilterTodoType } from "../model";

export interface FilterTodoListProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  > {
  currentFilter: FilterTodoType;
  showAll?: () => void;
  showActive?: () => void;
  showCompleted?: () => void;
}
