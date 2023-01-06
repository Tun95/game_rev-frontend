import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import About from "../../component/about/About";

function AboutScreen() {
  return (
    <>
      <Helmet>
        <title>About Us</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <About />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default AboutScreen;
