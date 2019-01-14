import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Replies } from './Replies';
import { NewReply } from './NewReply';
import { isNullOrUndefined } from 'util';
import { observer, inject } from 'mobx-react';

export const Comment = inject("userStore")(observer(class Comment extends React.Component {
  displayName = Comment.name

  constructor(props) {
    super(props);
    this.state = {
      likeCount: this.props.likeCount,
      postid: this.props.postID,
      commentid: this.props.commentID,
      replies: this.props.replyDataBlock,
      showComment: false
    };
  }

  onSubmitReply = (comment) => {
    this.props.userStore.AddCommentReply(this.state.commentid, comment);
  }

  handleLike = (comment_id) => {
    this.props.userStore.AddCommentLike(comment_id);
  }

  replyLink = () => {
    this.setState({ showComment: !this.state.showComment });
    this.renderNewReply();
  }

  closeReplyForm = () => {
    this.setState({ showComment: false });
    this.renderNewReply();
  }

  renderNewReply = () => {
    if (this.state.showComment) {
      return (<NewReply onCancel={this.closeReplyForm} commentid={this.state.commentid} />);
    }
  }

  renderReplies = () => {
    if (Array.isArray(this.state.replies) && this.state.replies.length) {
      return <Replies replyData={this.state.replies} />;
    }
  }

  render() {
    return (
      <div>
        <div className="py-2 px-2">
          <div className="d-flex text-secondary">
            <span className="mr-2">
              <a onClick={() => this.handleLike(this.state.commentid)}><FontAwesomeIcon icon="thumbs-up" /></a>
              <span className="mx-2">{this.state.likeCount}</span>
            </span>
            <a className="replybtn text-secondary" onClick={this.replyLink}>Reply</a>
          </div>
        </div>
        <div className="bg-light">
          {this.renderReplies()}
          {this.renderNewReply()}
        </div>
      </div>
    );
  }
}));
