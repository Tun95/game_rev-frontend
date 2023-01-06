import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import Request from "../../component/request/Request";

function RequestScreen() {
  return (
    <>
      <Helmet>
        <title>Request Games</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Request />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default RequestScreen;
