import { Todo } from "@/entities/todo/model";

export interface TodoFolderI {
  name: string;
  todos: Todo[];
}
