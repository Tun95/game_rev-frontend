import React from "react";
import axios from "axios";
import { useReducer } from "react";
import parse from "html-react-parser";
import { useEffect } from "react";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import { request } from "../../base_url/Base_URL";

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, loading: true };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, settings: action.payload };
    case "FETCH_FAIL":
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
function Privacy() {
  const [{ loading, error, settings }, dispatch] = useReducer(reducer, {
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
      window.scroll(0, 0);
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  return (
    <div className="acpd">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="acpd_box">
          {settings.map((s, index) => (
            <div key={index} className="acpd_content">
              {" "}
              {parse(`<p>${s?.privacy}</p>`)}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Privacy;
