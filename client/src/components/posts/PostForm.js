import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addPost } from "../../actions/post";
import "./PostForm.css";

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      addPost({ text });
      setText("");
    }
  };

  return (
    <div className="post-form-container">
      <h2 className="post-form-title">Create Post</h2>
      <div className="post-form-card">
        <form onSubmit={handleSubmit}>
          <div className="textarea-wrapper">
            <textarea
              name="text"
              placeholder="What's on your mind?"
              value={text}
              onChange={(e) => setText(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className={`post-textarea ${isFocused ? "focused" : ""}`}
              required
            />
          </div>
          <div className="post-form-actions">
            <button
              type="submit"
              className="post-submit-button"
              disabled={!text.trim()}
            >
              Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
