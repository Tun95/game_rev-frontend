import React, { useEffect, useReducer } from "react";
import ReactDOM from "react-dom";
import Countdown from "react-countdown";
import "./download.css";
import parse from "html-react-parser";
import download from "../../assets/download.png";
import axios from "axios";
import { useParams } from "react-router-dom";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, post: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_SETTINGS_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SETTINGS_SUCCESS":
      return { ...state, loading: false, settings: action.payload };
    case "FETCH_SETTINGS_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function Download() {
  const params = useParams();
  const { id: postId } = params;

  const [{ loading, error, post, settings }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });
  //=================
  //POST DOWNLOAD LINK
  //=================
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`/api/posts/download/${postId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };
    fetchData();
  }, [postId]);
  console.log(post);

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_SETTINGS_REQUEST" });
        const { data } = await axios.get("/api/settings");
        dispatch({ type: "FETCH_SETTINGS_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_SETTINGS_FAIL" });
      }
    };

    fetchData();
  }, []);

  //==========
  //COUNTDOWN
  //==========
  // Random component
  const Completionist = () => (
    <span>
      <div className="down_link_btn">
        <a href={post?.downloadLink}>
          <img src={download} alt="download link" />
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
