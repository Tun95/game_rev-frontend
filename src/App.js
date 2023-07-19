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
import { useContext } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import ru from "javascript-time-ago/locale/ru.json";
import { Context } from "./context/Context";

TimeAgo.addDefaultLocale(en);
TimeAgo.addLocale(ru);

function App() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { settings } = state;
  window.scroll(0, 0);

  const { background } =
    (settings &&
      settings
        .map((s) => ({
          background: s.background,
        }))
        .find(() => true)) ||
    {};
  return (
    <>
      <Router>
        <ToastContainer />
        <div
          className="App s_flex"
          style={{
            backgroundImage: `url(${background})`,
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
      </Router>
    </>
  );
}

export default App;
