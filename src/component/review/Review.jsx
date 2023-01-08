import React, { useContext, useEffect, useReducer } from "react";
import "./review.css";
import More from "../moregames/More";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import Comment from "../comment/Comment";
import { Helmet } from "react-helmet-async";
import AdSense from "react-adsense";
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

    case "FETCH_RELATED_REQUEST":
      return { ...state, loadingRelated: true };
    case "FETCH_RELATED_SUCCESS":
      return { ...state, loadingRelated: false, related: action.payload };
    case "FETCH_RELATED_FAIL":
      return { ...state, loadingRelated: false, errorRelated: action.payload };

    default:
      return state;
  }
};

function Review() {
  //TRACKING
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });
  const params = useParams();
  const { id: postId } = params;

  const [{ loading, error, post, related }, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings, adverts } = state;
  window.scroll(0, 0);
  //=================
  //POST FETCHING
  //=================
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}/api/posts/${postId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        window.scroll(0, 0);
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

  //=================
  //RELATED POST FETCHING
  //=================
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_RELATED_REQUEST" });
        const { data } = await axios.get(
          `${request}/api/posts/related/${postId}`
        );
        dispatch({ type: "FETCH_RELATED_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_RELATED_FAIL" });
      }
    };
    fetchData();
  }, [postId]);

  return (
    <div className="review">
      <Helmet>
        <title>{post?.slug}</title>
      </Helmet>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="review_box">
          <div className="review_content">
            <div className="top_post">
              {parse(`<p>${post?.description}</p>`)}
            </div>
            <div className="download_btn">
              <span>
                {adverts?.map((ads, index) => (
                  <span>
                    {!ads.ppcOne ? (
                      ""
                    ) : (
                      <a
                        key={index}
                        href={`${ads.ppcOne}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <span>Click here to download</span>
                      </a>
                    )}
                  </span>
                ))}
                <br />
                <br />
                {!post.downloadLink ? (
                  ""
                ) : (
                  <Link to={`/${postId}/download`}>
                    {settings?.map((s, index) => (
                      <img
                        src={s.downloadBtn}
                        alt="download button"
                        key={index}
                      />
                    ))}
                  </Link>
                )}
                <br />
                {!post.buyLink ? (
                  ""
                ) : (
                  <a
                    href={post.buyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {settings?.map((s, index) => (
                      <img
                        src={s.buyBtn}
                        alt="download button"
                        key={index}
                        className="buy"
                      />
                    ))}
                  </a>
                )}
              </span>
            </div>
            <div className="related_post">
              <h3 className="related_title">Related Posts:</h3>
              <div className="display_flex">
                {related?.map((item, index) => (
                  <div className="related_content" key={index}>
                    <div className="related_display">
                      <Link to={`/${item.id}/details`}>
                        {" "}
                        <img src={item.image} alt="related" className="small" />
                      </Link>{" "}
                      <div className="related_name_style">
                        <Link to={`/${item.id}/details`}>
                          {" "}
                          <h4 className="related_name">{item.title}</h4>{" "}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="review_more">
            <More />
            <AdSense.Google
              client="ca-pub-4626968536803317"
              slot="6639897134"
            />
            <Comment postId={postId} post={post} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
