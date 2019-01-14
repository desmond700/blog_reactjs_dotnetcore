import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';

import { Header } from '../../../components/Header';

export class DefaultLayout extends Component {
  displayName = DefaultLayout.name

  render() {
    return (
      <div>
        <Header />
        <div className="wrapper-sub">
          <div className="blog-main">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
