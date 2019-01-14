import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { UserNavMenu } from '../../../components/User/Component/NavMenu';
import { Header } from '../../../components/Header';

export class UserLayout extends Component {
  displayName = UserLayout.name

  render() {
    return (
      <div>
        <Header />
        <UserNavMenu />
        <div className="wrapper-sub">
          <div className="main">
            <div className="container">
              {this.props.children}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
