import React from 'react'
import { Helmet } from 'react-helmet-async';
import Footer from '../../common/footer/Footer';
import NavMenu from '../../common/navmenu/NavMenu';
import SideMenu from '../../common/sidemenu/SideMenu';
import Error from '../../component/error/Error';

function GameErrorScreen() {
	return (
    <>
      <Helmet>
        <title>How fix Game Errors</title>
      </Helmet>
      <div className="container">
        <NavMenu />
        <div className="home_container background e_flex">
          <Error />
          <SideMenu />
        </div>
        <Footer />
      </div>
    </>
  );
}

export default GameErrorScreen