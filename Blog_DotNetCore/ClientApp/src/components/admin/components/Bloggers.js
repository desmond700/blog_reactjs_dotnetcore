import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Bloggers extends Component{

  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    var userInfo = JSON.parse(sessionStorage.getItem("infoJson"));
    fetch("api/BlogData/GetBloggers?isAdmin=" + userInfo.is_Admin)
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

    let tr = data.map((data, i) => {
      return <tr key={i}>
        <td scope="row">{data.id}</td>
        <td><b>{data.firstname}</b></td>
        <td><b>{data.lastnamee}</b></td>
        <td>{data.username}</td>
        <td>{data.email}</td>
        <td>{data.timestamp}</td>
      </tr>;
    });

    return (
      <div className="w-100">
        <h1>List Bloggers</h1>

        <div className="d-flex my-4 ml-auto">      
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn border my-2 my-sm-0" type="submit">Search Post List</button>
          </form>
        </div>
        <div className="d-flex">
          <div className="mt-3">
            <table className="table">
              <caption>List of users</caption>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Firstname</th>
                  <th scope="col">Lastname</th>
                  <th scope="col">Username</th>
                  <th scope="col">Email</th>
                  <th scope="col">Date joined</th>
                </tr>
              </thead>
              <tbody>
                {tr}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
