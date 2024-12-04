import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import formatDate from '../../utils/formatDate';
import CommentForm from '../post/CommentForm';
import CommentItem from '../post/CommentItem';
import { getPost, addLike, removeLike, deletePost } from '../../actions/post';
import './Post.css';

const Post = ({ getPost, addLike, removeLike, deletePost, post: { post, loading }, auth }) => {
  const { id } = useParams();

  useEffect(() => {
    getPost(id);
  }, [getPost, id]);

  if (loading || post === null) {
    return <Spinner />;
  }

  return (
    <div className="post-detail-container">
      <Link to="/posts" className="back-button">
        Back To Posts
      </Link>

      <div className="post-card">
        <div className="post-header">
          <div className="post-author-info">
            <img src={post.avatar} alt={post.name} className="author-avatar" />
            <div className="author-name">{post.name}</div>
          </div>
          <div className="post-date">{formatDate(post.date)}</div>
        </div>

        <div className="post-content">
          <p className="post-text">{post.text}</p>
        </div>

        <div className="post-actions">
          <button
            onClick={() => addLike(post._id)}
            className="action-btn"
          >
            Like {post.likes?.length > 0 && (
              <span>{post.likes.length}</span>
            )}
          </button>
          <button
            onClick={() => removeLike(post._id)}
            className="action-btn"
          >
            Unlike
          </button>
          <button className="action-btn">
            Comments {post.comments?.length}
          </button>
          {!auth.loading && post.user === auth.user._id && (
            <button
              onClick={() => deletePost(post._id)}
              className="delete-btn"
            >
              Delete
            </button>
          )}
        </div>
      </div>

      <div className="comments-section">
        <h3 className="comments-title">Comments</h3>
        <CommentForm postId={post._id} />
        <div className="comments-list">
          {post.comments.map(comment => (
            <CommentItem key={comment._id} comment={comment} postId={post._id} />
          ))}
        </div>
      </div>
    </div>
  );
};

Post.propTypes = {
  getPost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  post: state.post,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPost, addLike, removeLike, deletePost }
)(Post);