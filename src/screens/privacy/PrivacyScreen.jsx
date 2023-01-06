import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import Privacy from "../../component/privacy/Privacy";

function PrivacyScreen() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Privacy />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default PrivacyScreen;
