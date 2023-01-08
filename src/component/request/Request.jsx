import React, { useContext } from "react";
import parse from "html-react-parser";
import Disqus from "disqus-react";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import AdSense from "react-adsense";
import { Context } from "../../context/Context";


function Request() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { loading, error,adverts, settings } = state;
  window.scroll(0, 0);

  const disqusShortname = process.env.REACT_APP_DISQUS_SHORTNAME;
  const disqusConfig = {};

  return (
    <div className="acpd">
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <MessageBox>{error}</MessageBox>
      ) : (
        <div className="acpd_box">
          {settings?.map((s, index) => (
            <div key={index} className="acpd_content">
              {" "}
              {parse(`<p>${s?.request}</p>`)}
            </div>
          ))}
        </div>
      )}
      <div className="request">
        <Disqus.DiscussionEmbed
          shortname={disqusShortname}
          config={disqusConfig}
        />
      </div>
      <div>
        {" "}
        {adverts.map((a, index) => (
          <span key={index}>
            <AdSense.Google client={a.clientId} slot={a.slot} />
          </span>
        ))}
      </div>
    </div>
  );
}

export default Request;
