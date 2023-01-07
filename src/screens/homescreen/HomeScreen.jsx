import React, { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import Home from "../../component/home/Home";
import "./homescreen.css";



function HomeScreen() {
  return (
    <>
      <Helmet>
        <title>Home</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Home />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default HomeScreen;
