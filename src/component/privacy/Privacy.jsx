import React, { useContext } from "react";
import parse from "html-react-parser";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import AdSense from "react-adsense";
import { Context } from "../../context/Context";

function Privacy() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { loading, error,adverts, settings } = state;
  window.scroll(0, 0);

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
      <div>
        {adverts?.map((a, index) => (
          <span key={index}>
            <AdSense.Google client={a.clientId} slot={a.slot} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Privacy;
