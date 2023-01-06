import React, { useEffect, useReducer, useState } from "react";
import "./styles.css";
import copy from "../../assets/copy.png";
import dmca from "../../assets/dmca.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { getError } from "../../utils/Utils";
import { request } from "../../base_url/Base_URL";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, settings: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_BANNER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_BANNER_SUCCESS":
      return { ...state, loading: false, adverts: action.payload };
    case "FETCH_BANNER_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_TOP_REQUEST":
      return { ...state, loadingTop: true };
    case "FETCH_TOP_SUCCESS":
      return { ...state, loadingTop: false, downloads: action.payload };
    case "FETCH_TOP_FAIL":
      return { ...state, loadingTop: false, error: action.payload };

    case "POST_REQUEST":
      return { ...state, loading: true };
    case "POST_SUCCESS":
      return { ...state, loading: false };
    case "POST_FAIL":
      return { ...state, loading: false };

    default:
      return state;
  }
};

function SideMenu() {
  const [{ loading, error, settings, adverts, downloads }, dispatch] =
    useReducer(reducer, {
      loading: true,
      error: "",
      settings: [],
    });

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}/api/settings`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  //==============
  //FETCH TOP DOWNLOADS
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_TOP_REQUEST" });
        const { data } = await axios.get(`${request}/api/posts/top-downloads`);
        dispatch({ type: "FETCH_TOP_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_TOP_FAIL" });
      }
    };

    fetchData();
  }, []);

  //==============
  //FETCH BANNER ADS
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_BANNER_REQUEST" });
        const { data } = await axios.get(`${request}/api/ads`);
        dispatch({ type: "FETCH_BANNER_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_BANNER_FAIL" });
      }
    };

    fetchData();
  }, []);

  //===========
  //SEARCH BOX
  //===========
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const submitHandler = (e) => {
    e.preventDefault();
    navigate(query ? `/?query=${query}` : "/");
    window.scrollTo(0, 0);
  };

  //===========
  //SUBSCRIBE
  //===========
  const [email, setEmail] = useState("");
  const subscribeHandler = async (e, action) => {
    e.preventDefault(e);
    try {
      const { data } = await axios.post(`${request}/api/subscribe`, {
        email,
      });
      dispatch({ type: "POST_SUCCESS", payload: data });
      toast.success("You have successfully subscribe to our newsletter", {
        position: "bottom-center",
      });
    } catch (err) {
      toast.error(getError(err), { position: "bottom-center" });
      dispatch({ type: "POST_FAIL" });
    }
  };

  return (
    <div className="side_menu">
      <div className="side_menu_box">
        <div className="side_menu_content">
          <form
            action=""
            onSubmit={submitHandler}
            className="search_box d_flex"
          >
            <i onClick={submitHandler} className="fa-solid fa-search"></i>
            <input
              type="search"
              name="q"
              id="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <span onClick={submitHandler} className="s_flex">
              GO
            </span>
          </form>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Advertisment</h3>
            </div>
            <span className="content content_image">
              {adverts?.map((ads, index) => (
                <a
                  key={index}
                  href={`${ads.bannerLinkOne}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src={ads.bannerOne}
                    alt="advertisment"
                    className="content_img"
                  />
                </a>
              ))}
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Top Downloaded Games</h3>
            </div>
            <span className="content content_image">
              <div className="display_grid">
                {downloads?.map((download, index) => (
                  <Link to={`/${download.id}/details`} key={index}>
                    {" "}
                    <img
                      src={download.banner}
                      alt="advertisment"
                      className="content_img"
                    />
                  </Link>
                ))}{" "}
              </div>
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Copyright &amp; dmca protected</h3>
            </div>
            <span className="content content_image">
              {settings.map((s, index) => (
                <div className="d_flex" key={index}>
                  <a
                    href={s.copyRight}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {" "}
                    <img src={copy} alt="copyright" className="content_img" />
                  </a>
                  <a href={s.dmca} target="_blank" rel="noopener noreferrer">
                    {" "}
                    <img src={dmca} alt="copyright" className="content_img" />
                  </a>
                </div>
              ))}
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>How to fix game errors</h3>
            </div>
            <span className="content">
              <Link
                to="/fix-general-installation-errors"
                className="content_link"
              >
                {" "}
                <h3 className="content_fix">
                  Game Corruption Errors &amp; Fix
                </h3>
              </Link>
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Advertisment</h3>
            </div>
            <span className="content content_image">
              {adverts?.map((ads, index) => (
                <div key={index}>
                  <a
                    href={`${ads.bannerLinkTwo}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={ads.bannerTwo}
                      alt="advertisment"
                      className="content_img"
                    />
                  </a>
                  <a
                    href={`${ads.bannerLinkThree}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={ads.bannerThree}
                      alt="advertisment"
                      className="content_img"
                    />
                  </a>{" "}
                  <a
                    href={`${ads.bannerLinkFour}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={ads.bannerFour}
                      alt="advertisment"
                      className="content_img"
                    />
                  </a>{" "}
                  <a
                    href={`${ads.bannerLinkFive}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={ads.bannerFive}
                      alt="advertisment"
                      className="content_img"
                    />
                  </a>
                </div>
              ))}
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Follow us on</h3>
            </div>
            <span className="content">
              {settings.map((s, index) => (
                <ul key={index}>
                  <li>
                    <a
                      href={s.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-facebook"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={s.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-twitter"></i>
                    </a>
                  </li>
                  <li>
                    <a
                      href={s.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <i className="fa-brands fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              ))}
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Request game section</h3>
            </div>
            <span className="content">
              <Link to="/request">
                <button className="btn_request">Request Section</button>
              </Link>
            </span>
          </div>
          <div className="content_box">
            <div className="content_header d_flex">
              <h3>Never miss a game</h3>
            </div>
            <span className="content  content_image">
              <form action="" onSubmit={subscribeHandler} className="lower_sub">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                />
                <button className="btn_sub">Subscribe</button>
              </form>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
