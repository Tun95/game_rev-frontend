import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import Disclaimer from "../../component/disclaimer/Disclaimer";

function DisclaimerScreen() {
  return (
    <>
      <Helmet>
        <title>Disclaimer</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Disclaimer />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DisclaimerScreen;
