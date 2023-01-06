import React from "react";
import { Helmet } from "react-helmet-async";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import Download from "../../component/download/Download";
import "./downloadscreen.css";

function DownloadScreen() {
  return (
    <>
      <Helmet>
        <title>Download Page</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background ">
          <Download />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default DownloadScreen;
