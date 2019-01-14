import React from 'react';
import { observer, inject } from 'mobx-react';

export const NewReply = inject("userStore")(observer(class NewReply extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      commentid: this.props.commentid,
      comment: ''
    };
  }

  commentChange = (e) => {
    this.setState({ comment: e.target.value });
  }

  updateSubmit = (e) => {
    e.preventDefault();
    var user_update = this.state.comment.trim();
    if (!user_update) {
      return;
    }
    else {
      this.props.userStore.AddCommentReply(this.state.commentid, this.state.comment);
      this.setState({ comment: '' });
    }
  }

  onCancel = () => {
    this.props.onCancel();
  }

  render() {
    return (
      <div className="px-3 pb-2 pt-3">
        <textarea
          placeholder="Write your comment and press enter!"
          className="form-control"
          onChange={this.commentChange}
          autoFocus={true}
        />
        <div className="d-flex justify-content-between py-2">
          <button onClick={this.updateSubmit} className="btn border">Comment</button>
          <button onClick={this.onCancel} className="btn border">Cancel</button>
        </div>
      </div>
    );
  }
}));
