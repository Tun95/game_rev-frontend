import React, { useState, useEffect, useReducer } from "react";
import "./styles.css";
import { Link } from "react-router-dom";
import axios from "axios";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, settings: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "FETCH_CATEGORY_SUCCESS":
      return { ...state, loading: false, categories: action.payload };
    case "FETCH_CATEGORY_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function NavMenu() {
  const [{ loading, error, settings, categories }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
      settings: [],
    }
  );

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get("/api/settings");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  //==============
  //FETCH CATEGORY HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_CATEGORY_REQUEST" });
        const { data } = await axios.get("/api/category/alphatical");
        dispatch({ type: "FETCH_CATEGORY_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_CATEGORY_FAIL" });
      }
    };

    fetchData();
  }, []);

  const [isActive, setIsActive] = useState("");

  return (
    <>
      <div className="nav_menu">
        <div className="nav_bar">
          <div className="logo">
            {settings.map((s, index) => (
              <Link to="/">
                <img src={s.logo} key={index} alt="" />
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
