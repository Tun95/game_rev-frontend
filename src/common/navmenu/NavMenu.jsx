import React, { useState, useContext } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import { Context } from "../../context/Context";

function NavMenu() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings, categories } = state;
  window.scroll(0, 0);

  const [isActive, setIsActive] = useState("");

  return (
    <>
      <div className="nav_menu">
        <div className="nav_bar">
          <div className="logo">
            {settings?.map((s, index) => (
              <Link to="/" key={index}>
                <img src={s.logo} alt="" />
              </Link>
            ))}
          </div>
          <div className="nav_content">
            <ul className="nav_list l_flex">
              <Link to="/">
                <li
                  className={
                    isActive === "/" ? "active l_flex" : "nav_li l_flex"
                  }
                >
                  <i className="fa-solid fa-house"></i> Home
                </li>
              </Link>
              {categories?.map(({ _id, category }, index) => (
                <Link key={index} to={`/?category=${category}`}>
                  <li
                    onClick={() => setIsActive(_id)}
                    className="nav_li l_flex"
                  >
                    {category}
                  </li>
                </Link>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default NavMenu;
