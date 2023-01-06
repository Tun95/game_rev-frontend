import React, { useState } from "react";
import "./styles.css";

function CommentForm(props) {
  const {
    handleSubmit,
    submitLabel,
    
    hasCancelButton = false,
    handleCancel,
    initialText = "",
  } = props;

  const [text, setText] = useState(initialText);

  const isTextareaDisabled = text.length === 0;

  const onSubmit = (e) => {
    e.preventDefault();
    handleSubmit(text);
    setText("");
  };
  return (
    <form action="" onSubmit={onSubmit}>
      <textarea
        className="comment-form-textarea"
        value={text}
        onChange={(e) => setText(e.target.value)}
      ></textarea>
      <button disabled={isTextareaDisabled} className="comment-form-button">
        {submitLabel}
      </button>
      {hasCancelButton && (
        <button
          type="button"
          onClick={handleCancel}
          className="comment-form-button comment-form-cancel-button"
        >Cancel</button>
      )}
    </form>
  );
}

export default CommentForm;
