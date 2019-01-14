import React, { Component } from 'react';

export class Dashboard extends Component {

  render() {
    return (
      <div className="w-100">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="#">Dashboard</a></li>
            <li className="breadcrumb-item active" aria-current="page">home</li>
          </ol>
        </nav>
        <hr/>
        <div className="container-fluid">
          <div className="row justify-content-center">
            <div className="col-md-3 col-lg-2 mx-3 bg-secondary">
              <div className="my-3 mx-3">
                <p>name</p>
                <p>name</p>
              </div>
            </div>
            <div className="col-md-3 col-lg-2 mx-3 bg-secondary">
              <div className="my-3 mx-3">
                <p>name</p>
                <p>name</p>
              </div>
            </div>
            <div className="col-md-3 col-lg-2 mx-3 bg-secondary">
              <div className="my-3 mx-3">
                <p>name</p>
                <p>name</p>
              </div>
            </div>
            <div className="col-md-3 col-lg-2 mx-3 bg-secondary">
              <div className="my-3 mx-3">
                <p>name</p>
                <p>name</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
