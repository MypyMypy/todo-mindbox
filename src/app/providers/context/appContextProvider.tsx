import React, { useReducer } from "react";
import { appReducer } from "./appReducer";
import { AppContext, initialAppContextValues } from "./appContext";
import { AppContextI } from "./appContext.types";

export const AppContextProvider: React.FC<{
  children: JSX.Element;
  initialValues?: AppContextI;
}> = ({ children, initialValues = initialAppContextValues }) => {
  const [state, dispatch] = useReducer(appReducer, initialValues);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};
