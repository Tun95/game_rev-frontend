import React, { useContext, useEffect, useReducer } from "react";
import { Helmet } from "react-helmet";
import Countdown from "react-countdown";
import "./download.css";
import parse from "html-react-parser";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import { request } from "../../base_url/Base_URL";
import ReactGA from "react-ga4";
import { Context } from "../../context/Context";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, post: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING, {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123,
  },
});
function Download() {
  //TRACKING
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const params = useParams();
  const { id: postId } = params;

  const [{ loading, error, post }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings, adverts } = state;
  window.scroll(0, 0);

  //=================
  //POST DOWNLOAD LINK
  //=================
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(
          `${request}/api/posts/download/${postId}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        window.scrollTo(0, 0);
        ReactGA.event({
          category: postId,
          action: "test action",
          label: "test label",
        });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };
    fetchData();
  }, [postId]);

  //==========
  //COUNTDOWN
  //==========
  // Random component
  const Completionist = () => (
    <span>
      <div className="down_link_btn">
        <a href={post?.downloadLink}>
          {settings?.map((s, index) => (
            <img src={s.downloadBtn} alt="download link" key={index} />
          ))}
        </a>
      </div>
    </span>
  );

  // Renderer callback with condition
  const renderer = ({ seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return <Completionist />;
    } else {
      // Render a countdown
      return (
        <span>
          <strong>
            The Download Button Appear in Just{" "}
            <span className="red_counter">{seconds} Seconds</span>
          </strong>{" "}
        </span>
      );
    }
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://trianglerockers.com/script_include.php?id=1311065";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="download">
      <div className="download_box">
        <div className="top_section">
          <h1 className="dark_theme">Download Your File Here</h1>
          {loading ? (
            <LoadingBox></LoadingBox>
          ) : error ? (
            <MessageBox>{error}</MessageBox>
          ) : (
            <>
              <Helmet>
                <script
                  type="text/javascript"
                  src="https://trianglerockers.com/script_include.php?id=1311065"
                ></script>
              </Helmet>
              <div className="top_section_cont">
                <div className="section_content">
                  <div className="info">
                    {settings?.map((s, index) => (
                      <div key={index} className="acpd_content">
                        {" "}
                        {parse(`<p>${s?.downLoadPage}</p>`)}
                      </div>
                    ))}
                  </div>
                  <small className="pls_wait">
                    Please wait Your Download Will Start in Few Momment...!!
                  </small>
                  <br />

                  <Countdown date={Date.now() + 10000} renderer={renderer} />
                </div>
              </div>
              <div className="down_section_cont">
                {settings?.map((s, index) => (
                  <div key={index} className="acpd_content">
                    {" "}
                    {parse(`<p>${s?.downLoadPageInfo}</p>`)}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default Download;
