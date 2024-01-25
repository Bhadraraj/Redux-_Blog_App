import React from "react";
import { Outlet } from "react-router-dom";
import  Header  from "./Header";
const Layouts = () => {
  return (
    <>
    <h1>Layouts</h1>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Layouts;
