import React from "react";
import Footer from "../../common/footer/Footer";
import NavMenu from "../../common/navmenu/NavMenu";
import SideMenu from "../../common/sidemenu/SideMenu";
import Review from "../../component/review/Review";

function ReviewScreen() {
  return (
    <>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Review />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default ReviewScreen;
