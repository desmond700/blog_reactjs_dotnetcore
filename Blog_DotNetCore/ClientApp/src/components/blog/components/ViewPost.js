import React, { Component } from 'react';
import HTMLReactParser from 'html-react-parser';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer, inject } from 'mobx-react';
import { CommentSection } from './comment/CommentSection';
import { isNullOrUndefined } from 'util';

export const ViewPost = inject("userStore")(observer(class ViewPost extends Component {

  constructor() {
    super();
    this.state = {
      data: []

    };
  }

  componentWillMount() {
    const { post_id } = this.props.match.params;
    sessionStorage.setItem("currentPst", post_id);

    this.props.userStore.FetchPost(post_id).then(data => {
          this.setState({ data });
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    const { data } = this.state;
    const article = HTMLReactParser(String(data.article));

    return (
      <div className="col-sm-12 col-md-12 col-lg-10 mx-auto mt-2">
        <div className="card border border-0">
          <div className="mt-2">
            <h2>{data.post_title}</h2>
            <p><small>by {data.author}</small></p>
          </div>
          <div className="d-flex py-2">
            <p className=""><FontAwesomeIcon icon="calendar" /> {data.post_date}</p>
            <p className="ml-5"><FontAwesomeIcon icon="folder-open" /> {data.category}</p>
            <p className="ml-5"><FontAwesomeIcon icon="comment" /> ({data.post_comment_count}) Comments </p>
          </div>
          <img className="card-img-top" src={`/images/feature/${data.post_feature_img}`} />
          <div className="card-body border py-2 my-3 bg-light">
            {article}
          </div>
          <hr />
          <div className="px-3 py-3">
            { this.state.data ? <CommentSection comments={data.comments} postID={this.props.match.params.post_id} /> : null }
          </div>
        </div>
      </div>
    );
  }
}));
