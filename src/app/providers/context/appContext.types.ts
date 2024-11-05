import { TodoReducerI, TodoActionsT } from "@/shared/reducers/todo";
import { Dispatch } from "react";

export interface AppContextI {
  todo: TodoReducerI;
}

export type AppDispatchT = Dispatch<TodoActionsT>;
