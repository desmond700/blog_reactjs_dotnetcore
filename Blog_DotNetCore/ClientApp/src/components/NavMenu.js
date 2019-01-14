import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import './NavMenu.css';
import { isNullOrUndefined } from 'util';
import { observer, inject } from 'mobx-react';

export const NavMenu = inject("userStore")(observer(class NavMenu extends Component {
  displayName = NavMenu.name

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.userStore.userData
    };
  }

  handleSignOut = () => {
    const signout = this.props.userStore.SignOut();
    if (signout)
      window.location.href = "/user/signin";
  }

  render() {
    const { data } = this.state;
    const imageUrl = isNullOrUndefined(data.image) ?
      "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" :
      `/images/users/${data.image}`;
    const account = ((data) => {
      if (data.username) {
        return (
          <div className="dropdown">
            <button className="d-flex btn dropdown-toggle pr-3 mr-3" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img className="rounded-circle border" src={imageUrl} width="30" />
              <NavLink to="/user/signup" className="nav-link text-dark">{data.username}</NavLink>
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <Link className="dropdown-item" to={`/user/${data.username}/overview`}>Profile</Link>
              <a className="dropdown-item" onClick={this.handleSignOut}>Sign out</a>
            </div>
          </div>
        );
      } else {
        return (
          <div className="d-flex border-right border-dark pr-3 mr-3">
            <NavLink to="/user/signin" className="nav-link text-dark border-right">Signin</NavLink>
            <NavLink to="/user/signup" className="nav-link text-dark">Signup</NavLink>
          </div>
        );
      }
    })(data);


    return (
      <nav className="navbar navbar-expand-md navbar-light bg-light py-0">
        {account}
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="#">Link</NavLink>
            </li>
            <div className="dropdown">
              <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Categories
              </button>
              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                <NavLink className="dropdown-item" to="/category/creativity">Creativity</NavLink>
                <NavLink className="dropdown-item" to="/category/technology">Technology</NavLink>
                <NavLink className="dropdown-item" to="/category/lifestyle">Lifestyle</NavLink>
                <NavLink className="dropdown-item" to="/category/food">Food</NavLink>
                <NavLink className="dropdown-item" to="/category/travel">Travel</NavLink>
              </div>
            </div>
          </ul>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>
        </div>
      </nav>
    );
  }
}));
