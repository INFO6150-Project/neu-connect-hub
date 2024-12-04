// import React from "react";
// import PropTypes from "prop-types";
// import { Link } from "react-router-dom";
// import formatDate from "../../utils/formatDate";
// import { connect } from "react-redux";
// import { addLike, removeLike, deletePost } from "../../actions/post";
// import "./PostItem.css";

// const PostItem = ({
//   addLike,
//   removeLike,
//   deletePost,
//   auth,
//   post: { _id, text, name, avatar, user, likes, comments, date },
// }) => (
//   <div className="post-card">
//     <div className="post-header">
//       <Link to={`/profile/${user}`} className="post-author">
//         <img className="author-avatar" src={avatar} alt={name} />
//         <span className="author-name">{name}</span>
//       </Link>
//       <span className="post-date">{formatDate(date)}</span>
//     </div>

//     <div className="post-content">
//       <p className="post-text">{text}</p>
//     </div>

//     <div className="post-actions">
//       <div className="action-group">
//         <button
//           onClick={() => addLike(_id)}
//           className="action-button"
//           title="Like"
//         >
//       Like
//           {likes.length > 0 && <span className="count">{likes.length}</span>}
//         </button>
//         <button
//           onClick={() => removeLike(_id)}
//           className="action-button"
//           title="Unlike"
//         >
//          Unlike
//         </button>
//       </div>

//       <Link to={`/posts/${_id}`} className="discussion-button">
//         Comments{" "}
//         {comments.length > 0 && (
//           <span className="count">{comments.length}</span>
//         )}
//       </Link>

//       {!auth.loading && user === auth.user._id && (
//         <button
//           onClick={() => deletePost(_id)}
//           className="delete-button"
//           title="Delete post"
//         >
//           Delete
//         </button>
//       )}
//     </div>
//   </div>
// );

// PostItem.propTypes = {
//   post: PropTypes.object.isRequired,
//   auth: PropTypes.object.isRequired,
//   addLike: PropTypes.func.isRequired,
//   removeLike: PropTypes.func.isRequired,
//   deletePost: PropTypes.func.isRequired,
// };

// const mapStateToProps = (state) => ({
//   auth: state.auth,
// });

// export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
//   PostItem
// );
import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import formatDate from "../../utils/formatDate";
import { connect } from "react-redux";
import { addLike, removeLike, deletePost } from "../../actions/post";
import "./PostItem.css";

const PostItem = ({
  addLike,
  removeLike,
  deletePost,
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  showActions = true
}) => (
  <div className="post-card">
    <div className="post-header">
      <Link to={`/profile/${user}`} className="post-author">
        <img className="author-avatar" src={avatar} alt={name} />
        <span className="author-name">{name}</span>
      </Link>
      <span className="post-date">{formatDate(date)}</span>
    </div>

    <div className="post-content">
      <p className="post-text">{text}</p>
    </div>

    {showActions && (
      <div className="post-actions">
        <div className="action-group">
          <button
            onClick={() => addLike(_id)}
            className="action-button"
            title="Like"
          >
            Like
            {likes.length > 0 && <span className="count">{likes.length}</span>}
          </button>
          <button
            onClick={() => removeLike(_id)}
            className="action-button"
            title="Unlike"
          >
            Unlike
          </button>
        </div>

        <Link to={`/posts/${_id}`} className="discussion-button">
          Comments{" "}
          {comments.length > 0 && (
            <span className="count">{comments.length}</span>
          )}
        </Link>

        {!auth.loading && user === auth.user._id && (
          <button
            onClick={() => deletePost(_id)}
            className="delete-button"
            title="Delete post"
          >
            Delete
          </button>
        )}
      </div>
    )}
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  showActions: PropTypes.bool
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);