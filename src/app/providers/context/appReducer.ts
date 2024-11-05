import { todoReducer, TodoActionsT } from "@/shared/reducers/todo";
import { AppContextI } from "./appContext.types";

export const appReducer = ({ todo }: AppContextI, action: TodoActionsT) => ({
  todo: todoReducer(todo, action as TodoActionsT),
});
