import React, { Suspense } from "react";
import { Route, Routes } from "react-router";

import { GoHome } from "@/features/go-home";
import { Main } from "@/shared/layout/Main";

const Home = React.lazy(() => import("@/pages/home"));
const Todo = React.lazy(() => import("@/pages/todo"));

export const AppRouter: React.FC = () => {
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Routes>
        <Route
          path="*"
          element={
            <Main>
              <GoHome />
              <h1>Page not Found</h1>
            </Main>
          }
        />
        <Route path="/" element={<Home />} />
        <Route path="/folders/:folderName" element={<Todo />} />
      </Routes>
    </Suspense>
  );
};
