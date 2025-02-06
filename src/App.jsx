import React from "react";
import LayoutComponents from "./Layout/Layout";
import MyRoutes from "./config";

function App() {
  return (
    <>
      <LayoutComponents>
        <MyRoutes />
      </LayoutComponents>
    </>
  );
}

export default App;
