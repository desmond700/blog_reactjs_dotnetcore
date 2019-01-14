import React, { Component } from 'react';

export class Edit extends Component {

  render() {
    const { post_id } = this.props.match.params;
    return (
      <div className="w-100">
        <h2>Edit post: {post_id}</h2>
      </div>
    );
  }
}
