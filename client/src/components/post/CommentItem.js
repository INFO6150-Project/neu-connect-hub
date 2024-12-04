import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import formatDate from '../../utils/formatDate';
import { deleteComment } from '../../actions/post';
import './CommentItem.css';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment
}) => (
  <div className="comment-item">
    <div className="comment-header">
      <div className="comment-user-info">
        <Link to={`/profile/${user}`} className="comment-user-link">
          <img src={avatar} alt={name} className="comment-avatar" />
          <span className="comment-username">{name}</span>
        </Link>
        <div className="comment-meta">
          <span className="comment-date">Posted on {formatDate(date)}</span>
        </div>
      </div>
      {!auth.loading && user === auth.user._id && (
        <button
          onClick={() => deleteComment(postId, _id)}
          type="button"
          className="comment-delete-btn"
        >
          Delete
        </button>
      )}
    </div>
    <div className="comment-body">
      <p className="comment-text">{text}</p>
    </div>
  </div>
);

CommentItem.propTypes = {
  postId: PropTypes.string.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);