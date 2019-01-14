import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { observer, inject } from 'mobx-react';


export const SignIn = inject("userStore")(observer(function (props) {

  this.onSubmitHandler = (e) => {
    e.preventDefault();
    var email = document.getElementById("exampleInputEmail").value;
    var password = document.getElementById("exampleInputPassword").value;

    let username = props.userStore.SignInUser(email, password);
    username.then(data => this.props.history.push(`/user/${data}/overview`));
  };

  return (
    <div className="col-md-4 mx-auto mt-4">
      <h3 className="my-3">Sign in</h3>
      <form onSubmit={this.onSubmitHandler}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword">Password</label>
          <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" />
        </div>
        <div className="form-check">
          <input type="checkbox" className="form-check-input" id="dropdownCheck" />
          <label className="form-check-label" htmlFor="dropdownCheck">
            Remember me
            </label>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <div className="dropdown-divider" />
      <Link className="dropdown-item pl-0" to="/user/signup">New around here? Sign up</Link>
      <Link className="dropdown-item pl-0" to="#">Forgot password?</Link>
    </div>
  );

}));
