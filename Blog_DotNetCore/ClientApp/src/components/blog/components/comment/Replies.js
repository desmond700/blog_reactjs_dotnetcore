import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNullOrUndefined } from 'util';
import { observer, inject } from 'mobx-react';

export const Replies = inject("userStore")(observer(class Replies extends React.Component {

  handleLike(comment_id) {
    this.props.userStore.AddCommentLike(comment_id);
  }

  render() {

    const replies = this.props.replyData.map(function (comment, index) {
      return (
        <div className="d-flex py-3 px-2 border-bottom" key={index}>
          <div className="px-1">
            <img src={isNullOrUndefined(comment.bloggers_img) ? "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" : "/images/users/" + comment.bloggers_img} width="48" className="img-fluid" />
          </div>
          <div className="flex-grow-1 px-2">
            <div className="d-flex justify-content-between">
              <b>{comment.username}</b>
              <a href="#" className="commetDelete" value={index} >X</a>
            </div>
            <div className="pb-1">
              <p className="mb-0">{comment.comment_text}</p>
            </div>
            <div className="pb-1">
              <small className="py-2 text-secondary">{comment.comment_date}</small>
            </div>
            <span className="mr-2 text-secondary">
              <a onClick={this.handleLike.bind(this, comment.comment_id)}><FontAwesomeIcon icon="thumbs-up" /></a>
              <span className="mx-2">{comment.commentLikeCount}</span>
            </span>
          </div>
        </div>
      );
    }.bind(this));
    return (
      <div>
        {replies}
      </div>
    );
  };
}));
