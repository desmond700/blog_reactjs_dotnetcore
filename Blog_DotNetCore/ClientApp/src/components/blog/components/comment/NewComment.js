import React, { Component } from "react";
import { observer, inject } from 'mobx-react';


export const NewComment = inject("userStore")(observer(class NewComment extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
      this.props.userStore.AddComment(this.state.comment);
      this.setState({ comment: '' });
    }
  }

  render() {
    //this.setState({ blogger_id: this.props.userstore.userData.id });
    return (
      <div className="px-3 py-3 bg-light">
        <div className="my-2">
          <h5 className="mb-3">LEAVE A REPLY</h5>
          <form onSubmit={this.updateSubmit}>
            <textarea
              ref="comment"
              placeholder="Write your comment and press enter!"
              className="form-control"
              onChange={this.commentChange}
              autoFocus={true}
            />
            <div className="py-2">
              <button type="submit" className="btn border">Post Comment</button>
            </div>
          </form>
        </div>
      </div>

    );
  }
}));
