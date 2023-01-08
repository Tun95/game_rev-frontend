import React, { useContext, useEffect, useReducer } from "react";
import "./home.css";
import { Link, useLocation } from "react-router-dom";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import axios from "axios";
import photo from "../../assets/photo.png";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import { getError } from "../../utils/Utils";
import ReactTimeAgo from "react-time-ago";
import { request } from "../../base_url/Base_URL";
import ReactGA from "react-ga4";
import AdSense from "react-adsense";
import { Context } from "../../context/Context";

ReactGA.initialize(process.env.REACT_APP_GOOGLE_TRACKING, {
  debug: true,
  titleCase: false,
  gaOptions: {
    userId: 123,
  },
});

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return {
        ...state,
        loading: false,
        posts: action.payload,
        page: action.payload.page,
        pages: action.payload.pages,
        countProducts: action.payload.countProducts,
      };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function Home() {
  //TRACKING
  useEffect(() => {
    ReactGA.pageview(window.location.pathname + window.location.search);
  });

  const [{ loading, error, posts, pages }, dispatch] = useReducer(
    reducer,
    {
      loading: true,
      error: "",
      posts: [],
    }
  );

  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { adverts } = state;
  window.scroll(0, 0);

  //===========
  //POST FILTER
  //===========
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const category = sp.get("category") || "all";
  const query = sp.get("query") || "all";
  const page = parseInt(sp.get("page") || 1);

  //==============
  //FETCH HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get(
          `${request}/api/posts/home?page=${page}&query=${query}&category=${category}`
        );
        dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        window.scrollTo(0, 0);
      } catch (err) {
        dispatch({ type: "FETCH_FAIL", payload: getError(err) });
      }
    };
    fetchData();
  }, [category, page, query]);

  const onPageView = (post) => {
    ReactGA.event({
      category: post.id,
      action: "test action",
      label: "test label",
    });
  };

  return (
    <div className="home">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <>
          <div className="home_box">
            {posts?.posts.length === 0 && (
              <span className="product-not">
                <MessageBox>No Post Found </MessageBox>
              </span>
            )}
            {posts?.posts?.map((post, index) => (
              <article className="home_content d_flex" key={index}>
                <div className="img">
                  <Link to={`/${post.id}/details`} onClick={onPageView}>
                    <img src={post.image || photo} alt="" className="small" />
                  </Link>
                </div>
                <div className="content">
                  <h2 className="content_header">
                    {" "}
                    <Link to={`/${post.id}/details`} onClick={onPageView}>
                      {post.title}
                    </Link>
                  </h2>
                  <div className="post_date_category">
                    <span className="d_flex btn_post">
                      <div className="post_date ">
                        <ReactTimeAgo
                          date={Date.parse(post.createdAt)}
                          locale="en-US"
                        />
                      </div>
                      <div className="post_category d_flex">
                        <span>in</span>
                        <strong>
                          {post.category?.slice(0, 3)?.map((c, index) => (
                            <ul key={index} className="n_flex">
                              <li onClick={onPageView}>
                                <Link to={`/?category=${c}`}>{c},</Link>
                              </li>
                            </ul>
                          ))}
                        </strong>
                      </div>
                    </span>
                  </div>
                  <p className="post_short">{post.shortDesc}</p>
                </div>
              </article>
            ))}
          </div>

          <Pagination
            page={page}
            count={pages}
            defaultPage={1}
            shape="rounded"
            variant="outlined"
            renderItem={(item) => (
              <PaginationItem
                component={Link}
                to={`/?page=${item.page}&query=${query}&category=${category}`}
                {...item}
              />
            )}
          />
        </>
      )}
      <div>
        <AdSense.Google client="ca-pub-4626968536803317" slot="6639897134" />
      </div>
    </div>
  );
}

export default Home;
