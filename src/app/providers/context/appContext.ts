import { createContext, useContext } from "react";
import { AppContextI, AppDispatchT } from "./appContext.types";
import { LocalStorageGetItem } from "@/shared/localStorage/localStorageUtils";

const folders = LocalStorageGetItem("todo");

export const initialAppContextValues: AppContextI = {
  todo: {
    folders: folders || [],
    error: null,
  },
} as const;

export const AppContext = createContext<{
  state: AppContextI;
  dispatch: AppDispatchT;
}>({
  state: initialAppContextValues,
  dispatch: () => null,
});

export const useAppContext = (): {
  state: AppContextI;
  dispatch: AppDispatchT;
} => {
  const { state, dispatch } = useContext(AppContext);
  return { state, dispatch };
};
