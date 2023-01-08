import axios from "axios";
import { useEffect, useState } from "react";
import { useReducer } from "react";
import { createContext } from "react";
import { request } from "../base_url/Base_URL";

export const Context = createContext();

function reducer(state, action) {
  switch (action.type) {
    case "FETCH_CATEGORY_REQUEST":
      return { ...state, loading: true };
    case "FETCH_CATEGORY_SUCCESS":
      return { ...state, loading: false, categories: action.payload };
    case "FETCH_CATEGORY_FAIL":
      return { ...state, loading: false, error: action.payload };

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

    default:
      return state;
  }
}

export function ContextProvider(props) {
  const [state, dispatch] = useReducer(reducer, {
    loading: true,
    error: "",
  });

  //==============
  //FETCH CATEGORY HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_CATEGORY_REQUEST" });
        const { data } = await axios.get(`${request}/api/category/alphatical`);
        dispatch({ type: "FETCH_CATEGORY_SUCCESS", payload: data });
      } catch (error) {
        dispatch({ type: "FETCH_CATEGORY_FAIL" });
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

  //==============
  //FETCH SETTINGS HANDLER
  //==============
  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "FETCH_REQUEST" });
        const { data } = await axios.get(`${request}/api/settings`);
        dispatch({ type: "FETCH_SUCCESS", payload: data });
        window.scrollTo(0, 0);
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

  const value = {
    state,
    dispatch,
  };

  return <Context.Provider value={value}>{props.children}</Context.Provider>;
}
