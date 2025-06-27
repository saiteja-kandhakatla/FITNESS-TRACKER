import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../common/Footer"
import Header from "../common/Header"
import 'bootstrap/dist/css/bootstrap.min.css';

const RootLayout = () => {
  return (
    <>
    <Header/> 
      <main>
        <Outlet /> 
      </main>
      <Footer /> 
    </>
  );
};

export default RootLayout;
