import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { AdminNavMenu } from '../../../components/admin/components/NavMenu';

export class AdminNavLayout extends Component {
  displayName = AdminNavLayout.name

  render() {
    return (
      <div>
        <AdminNavMenu />
        <div className="admin-main">
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
