import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer, inject } from 'mobx-react';

export const UserProfile = inject("userStore")(observer(class UserProfile extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      data: this.props.userStore.userData
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="mx-auto">
        <div className="d-flex">
          <h4 className="my-auto flex-grow-1 border-bottom">Profile</h4>
          <Link className="btn ml-3" to={`/user/${data.username}/edit`}>
            <FontAwesomeIcon icon="user" className="mr-1" /> Edit profile
          </Link>
        </div>
        <div className="row mt-5">
          <div className="card col-md-12">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon="user" className="mr-1" /> About
              </h5>
              <div className="ml-4">
                <p className="card-text my-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <div className="d-flex">
                  <div className="d-flex flex-column pr-2">
                    <p className="card-subtitle text-secondary">Birthday:</p>
                    <p className="card-subtitle text-secondary">Languages:</p>
                    <p className="card-subtitle text-secondary">Date joined:</p>
                  </div>
                  <div className="d-flex flex-column pl-2">
                    <p className="card-subtitle">Mar 20</p>
                    <p className="card-subtitle">English, French</p>
                    <p className="card-subtitle">{data.timestamp}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="card col-md-12">
            <div className="card-body">
              <h5 className="card-title">
                <FontAwesomeIcon icon="user" className="mr-1" /> Contact
              </h5>
              <div className="d-flex ml-4">
                <div className="d-flex flex-column pr-2">
                  <p className="card-subtitle text-secondary">Email:</p>
                  <p className="card-subtitle text-secondary">Facebook:</p>
                  <p className="card-subtitle text-secondary">Twitter:</p>
                  <p className="card-subtitle text-secondary">Github:</p>
                </div>
                <div className="d-flex flex-column pl-2">
                  <p className="card-subtitle">N/A</p>
                  <p className="card-subtitle">N/A</p>
                  <p className="card-subtitle">N/A</p>
                  <p className="card-subtitle">N/A</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}));
