import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import PostItem from "./PostItem";
import PostForm from "./PostForm";
import { getPosts } from "../../actions/post";
import "./Posts.css";

const Posts = ({ getPosts, post: { posts } }) => {
  useEffect(() => {
    getPosts();
  }, [getPosts]);

  return (
    <div className="posts-container">
      <div className="posts-header">
        <h1 className="posts-title">Community Posts</h1>
        <p className="posts-subtitle">
          Join the conversation with other developers
        </p>
      </div>

      <PostForm />

      <div className="posts-section">
        {posts.length > 0 ? (
          <div className="posts-list">
            {posts.map((post) => (
              <PostItem key={post._id} post={post} />
            ))}
          </div>
        ) : (
          <div className="posts-empty">
            <p>No posts found</p>
          </div>
        )}
      </div>
    </div>
  );
};

Posts.propTypes = {
  getPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  post: state.post,
});

export default connect(mapStateToProps, { getPosts })(Posts);
