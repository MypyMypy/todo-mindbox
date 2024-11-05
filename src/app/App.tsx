import React from "react";

import {
  ErrorBoundary,
  AppContextProvider,
  AppRouter as Router,
} from "./providers";

import "./index.scss";

export const App: React.FC = () => (
  <ErrorBoundary>
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </ErrorBoundary>
);
