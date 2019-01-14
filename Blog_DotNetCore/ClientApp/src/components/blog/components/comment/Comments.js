import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Comment } from './Comment';
import { isNullOrUndefined } from 'util';
import { observer, inject } from 'mobx-react';

export const Comments = inject("userStore")(observer(class Comments extends React.Component {
  displayName = Comments.name

  /*componentWillReceiveProps(nextProp) {
    this.setState({ handleLike: nextProp.handleLike, comments: nextProp.comments, });
  }*/

  render() {
    const comments = [];
    if (Array.isArray(this.props.userStore.comments) && this.props.userStore.comments.length) {
      this.props.userStore.comments.map(function (data, index) {
        comments.push(
          <div className="d-flex mt-4" key={data.comment_id}>
            <div className="mx-2">
              <img className="img-fluid" src={isNullOrUndefined(data.bloggers_img) ? "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" : "/images/users/" + data.bloggers_img} width="48" />
            </div>
            <div className="comments flex-grow-1 px-2">
              <div>
                <div className="py-2">
                  <p className="d-flex justify-content-between mb-0"><b>{data.username}</b> <a href="#" className="commetDelete" value={data.comment_id} >X</a></p>
                </div>
                <div className="pb-1">
                  <p className="mb-0">{data.comment_text}</p>
                </div>
                <small className="py-2 text-secondary">{data.comment_date}</small>
              </div>
              <Comment
                likeCount={data.commentLikeCount}
                postID={data.post_id}
                commentID={data.comment_id}
                replyDataBlock={data.reply}
                commentIndex={index} />
            </div>
          </div>
        );
      });
    } else {
      comments.push(<p className="my-4">No Comments</p>);
    }

    return (
      <div>
        {comments}
      </div>
    );
  }
}));
