import React, { useEffect, useReducer } from "react";
import "./review.css";
import More from "../moregames/More";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import download from "../../assets/download.png";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import Comment from "../comment/Comment";
import { Helmet } from "react-helmet-async";
import AdSense from "react-adsense";
import { request } from "../../base_url/Base_URL";

// ads with no set-up

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, post: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    case "FETCH_BANNER_REQUEST":
      return { ...state, loading: true };
    case "FETCH_BANNER_SUCCESS":
      return { ...state, loading: false, adverts: action.payload };
    case "FETCH_BANNER_FAIL":
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
  const params = useParams();
  const { id: postId } = params;

  const [{ loading, error, post, related, adverts }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
    }
  );
  //=================
  //POST FETCHING
  //=================
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}/api/posts/${postId}`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (err) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };
    fetchData();
  }, [postId]);
  console.log(post);

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
                  <a
                    key={index}
                    href={`${ads.ppcOne}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>Click here to download</span>
                  </a>
                ))}
                <br />
                <br />
                <Link to={`/${postId}/download`}>
                  <img src={download} alt="download button" />
                </Link>
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
              client="ca-pub-7292810486004926"
              slot="7806394673"
            />

            {/* <Adsense client="ca-pub-7640562161899788" slot="7259870550" /> */}
            <Comment postId={postId} post={post} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Review;
