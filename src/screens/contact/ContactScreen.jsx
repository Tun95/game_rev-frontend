import React from "react";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import Contact from "../../component/contact/Contact";
import { Helmet } from "react-helmet-async";

function ContactScreen() {
  return (
    <>
      <Helmet>
        <title>Contact Us</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Contact />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ContactScreen;
