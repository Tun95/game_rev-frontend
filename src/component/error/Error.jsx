import React, { useContext } from "react";
import parse from "html-react-parser";
import LoadingBox from "../../utils/loading message/LoadingBox";
import MessageBox from "../../utils/loading message/MessageBox";
import AdSense from "react-adsense";
import { Context } from "../../context/Context";

function Error() {
  const { state, dispatch: ctxDispatch } = useContext(Context);
  const { loading, error, settings, adverts } = state;
  window.scroll(0, 0);

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
              {parse(`<p>${s?.gameErr}</p>`)}
            </div>
          ))}
        </div>
      )}
      <div>
        <AdSense.Google client="ca-pub-4626968536803317" slot="6639897134" />
      </div>
    </div>
  );
}

export default Error;
