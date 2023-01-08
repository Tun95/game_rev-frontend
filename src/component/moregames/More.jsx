import React, { useContext, useEffect, useReducer } from "react";
import "./more.css";
import { Link } from "react-router-dom";
import axios from "axios";
import ReactTimeAgo from "react-time-ago";
import { request } from "../../base_url/Base_URL";
import { Context } from "../../context/Context";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, posts: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

function More() {
  const [{ posts }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
    posts: [],
  });

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings } = state;
  window.scroll(0, 0);

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}/api/posts`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="more">
      <div className="more_box">
        <div className="more_content">
          <h5>
            {settings?.map((s, index) => (
              <p key={index}>
                <span>Also on </span>
                {s.webName}
              </p>
            ))}
          </h5>

          <div className="content">
            <div className="display_flex">
              {posts?.slice(0, 4)?.map((post, index) => (
                <div className="related_content more_ctn" key={index}>
                  <div className="related_display">
                    <Link to={`/${post.id}/details`}>
                      {" "}
                      <img
                        src={post.banner}
                        alt="related"
                        className="small more_small"
                      />
                    </Link>
                    <div className="more_name_style">
                      <Link to={`/${post.id}/details`}>
                        {" "}
                        <h4 className="related_name">{post.title}</h4>
                      </Link>
                    </div>
                    <small className="more_desc"></small>
                    <small className="more_comment">
                      <ReactTimeAgo
                        date={Date.parse(post.createdAt)}
                        locale="en-US"
                      />
                    </small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default More;
