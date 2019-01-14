import React, { Component } from 'react';
import { Col, Grid, Row } from 'react-bootstrap';
import { AdminNavMenu } from '../../../components/admin/components/NavMenu';
import { AsideMakePostMenu } from '../../../components/blog/components/AsideMakePostMenu';

export class AdminMakePostLayout extends Component {
  displayName = AdminMakePostLayout.name

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
    this.setState({ title });
  }

  setCategory(category = null) {
    this.setState({ category });
  }

  setArticle(article = null) {
    this.setState({ article });
  }

  setFeature(feature = null) {
    this.setState({ feature });
  }

  makePost() {
    const userInfo = JSON.parse(window.sessionStorage.getItem("infoJson"));
    const formData = new FormData();
    const keys = Object.keys(this.state);
    keys.forEach(key => {
      formData.append(key, this.state[key]);
    });
    

    fetch('api/blogData/MakePost?id='+userInfo.id+'&isAdmin='+true, {
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
    const { children } = this.props;

    const childrenComponent = React.Children.map(children, child => {
      return React.cloneElement(child, {
        postTitle: this.setTitle.bind(this),
        postArticle: this.setArticle.bind(this)
      });
    });

    return (
      <div>
        <AdminNavMenu />
        <div className="admin-main">
          <div className="container">
            {childrenComponent}
          </div>
          <AsideMakePostMenu
            publish={this.makePost.bind(this)}
            feature={this.setFeature.bind(this)}
            category={this.setCategory.bind(this)}
          />
        </div>
      </div>
    );
  }
}
