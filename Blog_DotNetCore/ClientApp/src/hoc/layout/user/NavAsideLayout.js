import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { UserNavMenu } from '../../../components/User/Component/NavMenu';
import { Header } from '../../../components/Header';

export class UserAsideLayout extends Component {
  displayName = UserAsideLayout.name

  constructor(props) {
    super(props);

    this.state = {
      title: null,
      category: null,
      article: null,
      feature: null
    };
  }

  setTitle(title = null) {
    this.setState({ title: title });
  }

  setCategory(category = null) {
    this.setState({ category: category });
  }

  setArticle(article = null) {
    this.setState({ article: article });
  }

  setFeature(feature = null) {
    this.setState({ feature: feature });
  }

  makePost() {
    const userInfo = JSON.parse(window.sessionStorage.getItem("infoJson"));
    const formData = new FormData();
    const keys = Object.keys(this.state);
    keys.forEach(key => {
      formData.append(key, this.state[key]);
    });
    console.log(this.state);

    fetch('api/blogData/MakePost?id=' + userInfo.id + '&isAdmin=' + userInfo.is_Admin, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        response.json().then(result => {
          console.log("result:" + result);
        });
      }).catch(error => {
        console.log("error:" + error);
      });
  }

  render() {
    const { children, asideComponent } = this.props;

    const childrenComponent = React.Children.map(children, child => {
      return React.cloneElement(child, {
        postTitle: this.setTitle.bind(this),
        postArticle: this.setArticle.bind(this)
      });
    });

    const aside = React.Children.map(asideComponent, child => {
      return React.cloneElement(child, {
        category: this.setCategory.bind(this),
        feature: this.setFeature.bind(this),
        publish: this.makePost.bind(this)
      });
    });

    return (
      <div>
        <Header />
        <div className="wrapper-sub">
          <UserNavMenu />
          <div className="main">
            <div className="container">
              {childrenComponent}
            </div>
            {aside}
          </div>
        </div>
      </div>
    );
  }
}
