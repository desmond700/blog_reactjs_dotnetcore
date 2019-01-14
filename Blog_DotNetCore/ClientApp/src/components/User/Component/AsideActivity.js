import React, { Component } from 'react';
import './NavMenu.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer, inject } from 'mobx-react';

export const AsideActivity = inject("userStore")(observer(class AsideActivity extends Component {
  displayName = AsideActivity.name

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.userStore.userData
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div>
        <div className="border px-2 py-2 mt-5">
          <nav className="user-stats-list">
            <div className="px-2 border-bottom">
              <h5>Stats</h5>
            </div>
            <ul>
              <li className="d-flex">
                <div className="d-flex px-2">
                  <FontAwesomeIcon icon='pencil-alt' className="stat-icon my-auto" />
                </div>
                <div className="px-2">
                  <p className="text-primary font-weight-bold">{data.numOfPostsMade}</p>
                  <p>Posts</p>
                </div>
              </li>
              <li className="d-flex">
                <div className="d-flex px-2">
                  <FontAwesomeIcon icon='comments' className="stat-icon my-auto" />
                </div>
                <div className="px-2">
                  <p className="text-primary font-weight-bold">{data.numOfCommentsMade}</p>
                  <p>Comments</p>
                </div>
              </li>
            </ul>
          </nav>
        </div>

      </div>
    );
  }
}));
