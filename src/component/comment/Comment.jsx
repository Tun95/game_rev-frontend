import React from "react";
import Disqus from "disqus-react";

function Comment(props) {
  const { postId, post } = props;

  const disqusShortname = process.env.REACT_APP_DISQUS_SHORTNAME;
  const disqusConfig = {
    identifier: post?.id,
    title: post?.title,
  };

  return (
    <div>
      <Disqus.DiscussionEmbed
        shortname={disqusShortname}
        config={disqusConfig}
      />
    </div>
  );
}

export default Comment;
