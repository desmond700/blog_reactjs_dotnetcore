import React, { Component } from 'react';
import './NavMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { isNullOrUndefined } from 'util';

export class AsideHome extends Component {
  displayName = AsideHome.name

  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    fetch("api/BlogData/GetRecentPosts")
      .then(response => {
        response.json().then(data => {
          this.setState({ data });
        });
      }).catch(error => {
        console.log(error);
      });
  }

  render() {
    let { data } = this.state;

    let recentsPosts = [];

    if (data) {
      data.map((data, index) => {
        recentsPosts.push(<div className="d-flex mt-2" key={index}>
          <div className="d-flex px-2">
            <img src={isNullOrUndefined(data.post_feature_img) ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ8iFpOTiKyIyepMZ8t3B3g4N89uS3jhQ-8ZL07kF0b8b6eyCAKdg" : `/images/feature/${data.post_feature_img}`} width="80" />
          </div>
          <div className="px-2">
            <a href="#"><b>{data.post_title}</b></a><br />
            <small className="text-secondary"><span className="pr-2">{data.post_comment_count} Comments</span>|<span className="pl-2">{data.post_date}</span></small>
          </div>
        </div>);
      });
    } else {
      recentsPosts.push(<div className="py-2">
                          <p>No recent posts</p>
                        </div>);
    }

    return (
      <div>
        <div className="px-2 py-2 mt-5">
          <div className="user-stats-list">
            <div className="px-2 border-bottom">
              <h5>Recent posts</h5>
            </div>
            <div>
              {recentsPosts}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
