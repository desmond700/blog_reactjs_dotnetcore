import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavMenu.css';
import { isNullOrUndefined } from 'util';
import { observer, inject } from 'mobx-react';

export const UserNavMenu = inject("userStore")(observer(class UserNavMenu extends Component {
  displayName = UserNavMenu.name

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.userStore.userData
    };
  }

  componentDidMount() {
    var dropdown = document.getElementsByClassName("sub-nav-trigger");

    for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", () => {
        //this.classList.toggle("active");
        let dropdownContent = document.getElementsByClassName("sub-collapse")[i];
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }



  handleClick = () => {
    window.sessionStorage.removeItem("infoJson");
    window.sessionStorage.removeItem("admin_isLoggedIn");
    //window.location.href = "/admin/login";
  }

  render() {
    const { data } = this.state;
    const imageUrl = isNullOrUndefined(data.image) ?
      "https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" :
      `/images/users/${data.image}`;

    if (isNullOrUndefined(data))
      this.props.history.push("/user/signin");


    return (
      <nav className="user-navbar px-0 border-right">
        <div className="nav-container">
          <div className="d-flex flex-column mt-3 mb-5 w-100">
            <p className="d-flex justify-content-center">
              <Link to={'/user/profile'} className="d-flex profile-link">
                <img className="mx-auto" src={imageUrl} height="100" />
              </Link>
            </p>
            <p className="py-0 my-0 text-center">{data.firstname} {data.lastname}</p>
            <small className="text-secondary">Say something about yourself</small>
          </div>
          <div className='navbar-header text-secondary'>
            MENU
          </div>
          <div className='navbar-collapse'>
            <nav>
              <li className='nav-item'>
                <NavLink to={`/user/${data.username}/overview`} activeStyle={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <FontAwesomeIcon icon='home' /> Overview
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={`/user/${data.username}/activity`} activeStyle={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <FontAwesomeIcon icon='user' /> Activity
                </NavLink>
              </li>
              <li className='nav-item'>
                <button className="sub-nav-trigger text-left">
                  <FontAwesomeIcon icon='blog' /> Post
                </button>
                <nav className="sub-collapse">
                  <li className='nav-item'>
                    <NavLink to={`/user/${data.username}/post/makeapost`} activeStyle={{ backgroundColor: '#343a40', color: '#fff' }}>
                      <FontAwesomeIcon icon='pencil-alt' /> Make a post
                    </NavLink>
                  </li>
                  <li className='nav-item border-top border-secondary'>
                    <NavLink to={`/user/${data.username}/post/view`} activeStyle={{ backgroundColor: '#343a40', color: '#fff' }}>
                      <FontAwesomeIcon icon='list-alt' /> View posts
                    </NavLink>
                  </li>
                </nav>
              </li>
              <li className='nav-item'>
                <NavLink to={`/user/${data.username}/inbox`} activeStyle={{ backgroundColor: '#343a40', color: '#fff' }}>
                  <FontAwesomeIcon icon='envelope' /> Inbox
                </NavLink>
              </li>
            </nav>
          </div>
          <div className='navbar-header text-secondary'>
            META
          </div>
          <div className='navbar-collapse'>
            <nav>
              <li>
                <button onClick={() => this.handleClick()} className="text-left">
                  <FontAwesomeIcon icon='sign-out-alt' /> Logout
                </button>
              </li>
            </nav>
          </div>
        </div>
      </nav>
    );
  }
}));
