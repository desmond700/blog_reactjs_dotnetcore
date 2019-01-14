import React from 'react';
import { NewComment } from './NewComment';
import { Comments } from './Comments';
import { observer, inject } from 'mobx-react';
import { isNullOrUndefined } from 'util';

export const CommentSection =  inject("userStore")(observer(class CommentSection extends React.Component {
  displayName = CommentSection.name

  constructor() {
    super();
    this.state = {
      comments: {},
      postid: null
    };
    
  }

  componentDidMount() {
    this.userInfo = this.props.userStore.userData;
  }

  componentWillReceiveProps(nextProp){
    this.setState({
      comments: nextProp.comments,
      postid: nextProp.postID
    });
  }

  updateCommentSubmit = (update) => {
    console.log(update);
    fetch("api/BlogData/AddComment?isAdmin=" + this.userInfo.is_Admin, 
      {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(update)
    }).then(response => {
      response.json().then(data => {
        this.setState({ comments: data });
      });
    }).catch(error => console.log(error));
  }

  

  render() {
    return (
      <div className="my-3">
        <NewComment postid={this.state.postid} onUpdateSubmit={this.updateCommentSubmit} />
        <Comments comments={this.state.comments} handleLike={this.handleLike} />
      </div>
    );
  }
}));
