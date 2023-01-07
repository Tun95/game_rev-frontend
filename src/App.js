import "./App.css";
import DownloadScreen from "./screens/downloadscreen/DownloadScreen";
import HomeScreen from "./screens/homescreen/HomeScreen";
import ReviewScreen from "./screens/reviewscreen/ReviewScreen";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutScreen from "./screens/about/AboutScreen";
import ContactScreen from "./screens/contact/ContactScreen";
import DisclaimerScreen from "./screens/disclaimer/DisclaimerScreen";
import PrivacyScreen from "./screens/privacy/PrivacyScreen";
import GameErrorScreen from "./screens/error/GameErrorScreen";
import RequestScreen from "./screens/request/RequestScreen";
import { useEffect } from "react";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useReducer } from "react";
import TimeAgo from "javascript-time-ago";
import {request} from "./base_url/Base_URL"

import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

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
function App() {
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
      } catch (error) {
        dispatch({ type: "FETCH_FAIL" });
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Router>
        <ToastContainer />
        {settings.map((b, index) => (
          <div
            className="App s_flex"
            key={index}
            style={{
              backgroundImage: `url(${b.background})`,
              backgroundAttachment: "fixed",
            }}
          >
            <Routes>
              <Route path="/" element={<HomeScreen />}></Route>
              <Route path="/:id/details" element={<ReviewScreen />}></Route>
              <Route path="/:id/download" element={<DownloadScreen />}></Route>
              <Route path="/about" element={<AboutScreen />}></Route>
              <Route path="/contact" element={<ContactScreen />}></Route>
              <Route path="/request" element={<RequestScreen />}></Route>
              <Route path="/disclaimer" element={<DisclaimerScreen />}></Route>
              <Route path="/privacy-policy" element={<PrivacyScreen />}></Route>
              <Route
                path="/fix-general-installation-errors"
                element={<GameErrorScreen />}
              ></Route>
            </Routes>
          </div>
        ))}
      </Router>
    </>
  );
}

export default App;
