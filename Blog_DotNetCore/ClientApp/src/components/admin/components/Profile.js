import React, { Component } from 'react';

export class Profile extends Component {

  render() {
    const { admin_id } = this.props.match.params;
    return (
      <div className="w-100">
        <h2>Profile: {admin_id}</h2>
      </div>
    );
  }
}
