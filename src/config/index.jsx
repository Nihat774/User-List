import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

function MyRoutes() {
  const FirstPage = lazy(() => import("../pages/FirstPage"));
  const SecondPage = lazy(() => import("../pages/SecondPage"));
  const ThirdPage = lazy(() => import("../pages/ThirtPage"));

  return (
    <Suspense fallback="loading...">
      <Routes>
        <Route path="/" element={<FirstPage />} /> 
        <Route path="/2" element={<SecondPage />} />
        <Route path="/3" element={<ThirdPage />} />
      </Routes>
    </Suspense>
  );
}

export default MyRoutes;
