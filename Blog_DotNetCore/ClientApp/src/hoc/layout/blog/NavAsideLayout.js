import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { Header } from '../../../components/Header';

export class DefaultAsideLayout extends Component {
  displayName = DefaultAsideLayout.name

  render() {
    return (
      <div>
        <Header />
        <div className="container-fluid blog-main">
          <Row>
            <Col sm={12} md={7} lg={8}>
              <div className="container">
                {this.props.children}
              </div>
            </Col>
            <Col sm={12} md={5} lg={4}>
              {this.props.asideComponent}
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}
