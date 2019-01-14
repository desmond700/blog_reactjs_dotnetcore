import React, { Component } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Glyphicon } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './NavMenu.css';

export class AdminNavMenu extends Component {
  displayName = AdminNavMenu.name

  componentDidMount() {
    var dropdown = document.getElementsByClassName("sub-nav-trigger");

    for (let i = 0; i < dropdown.length; i++) {
      dropdown[i].addEventListener("click", () => {
        //this.classList.toggle("active");
        let dropdownContent = document.getElementsByClassName("sub-collapse")[i];
        console.log(dropdownContent);
        if (dropdownContent.style.display === "block") {
          dropdownContent.style.display = "none";
        } else {
          dropdownContent.style.display = "block";
        }
      });
    }
  }

  data = JSON.parse(window.sessionStorage.getItem("infoJson"));

  handleClick = () => {
    window.sessionStorage.removeItem("infoJson");
    window.sessionStorage.removeItem("admin_isLoggedIn");
    window.location.href = "/admin/login";
  }

  handleMouseOver() {
    
  }


  render() {
    return (
      <nav className="admin-navbar bg-dark px-0">
        <div className="nav-container">
          <div className='navbar-header d-flex'>
            <div className='navbar-brand mx-auto'>
              <NavLink to={'/'} className=""><h3>Admin Panel</h3></NavLink>
            </div>
          </div>
          <div className="d-flex flex-column my-3 text-light w-100">
            <p className="d-flex justify-content-center">
              <Link to={`/admin/profile/${this.data.id}`} className="d-flex profile-link">
                <img className="mx-auto" src="https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" height="100" />
              </Link>
            </p>
            <p className="py-0 my-0 text-center">{this.data.firstName} {this.data.lastName}</p>
            <small className="text-center">Administrator</small>
          </div>
          <div className='navbar-header text-secondary'>
            MENU
          </div>
          <div className='navbar-collapse'>
            <nav id="admin_link">
              <li className='nav-item'>
                <NavLink to={'/admin/dashboard'} activeStyle={{ backgroundColor:'#4189C7'}}>
                  <FontAwesomeIcon icon='home' /> Dashboard
                </NavLink>
              </li>
              <li className='nav-item'>
                <NavLink to={'/admin/bloggers/list'} activeStyle={{ backgroundColor: '#4189C7' }}>
                  <FontAwesomeIcon icon='user' /> Bloggers
                </NavLink>
              </li>
              <li className='nav-item'>
                <button className="sub-nav-trigger btn btn-block text-left btn-dark" activeStyle={{ backgroundColor: '#4189C7' }}>
                  <FontAwesomeIcon icon='blog' /> Post
                </button>
                <nav className="sub-collapse">
                  <li className='nav-item'>
                    <NavLink to={'/admin/post/makeapost'} activeStyle={{ backgroundColor: '#4189C7' }}>
                      <FontAwesomeIcon icon='pencil-alt' /> Make a post
                    </NavLink>
                  </li>
                  <li className='nav-item border-top border-secondary'>
                    <NavLink to={'/admin/post/view'} activeStyle={{ backgroundColor: '#4189C7' }}>
                      <FontAwesomeIcon icon='list-alt' /> View posts
                    </NavLink>
                  </li>
                </nav>
              </li>
              <li className='nav-item'>
                <NavLink to={'/admin/inbox'} activeStyle={{ backgroundColor: '#4189C7' }}>
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
                <button onClick={() => this.handleClick()} className="btn btn-block text-left btn-dark">
                  <FontAwesomeIcon icon='sign-out-alt' /> Logout
                </button>
              </li>
            </nav>
          </div>
        </div>
      </nav>
    );
  }
}
