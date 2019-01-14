import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';

export class Login extends Component {

  constructor(props) {
    super(props);
    
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.message = document.getElementById("message");
    this.message.style.visibility = "hidden";
    this.message.style.height = "0px";
    this.message.style.visibility = "hidden";

    this.loading = document.getElementById("loading");
    this.loading.style.visibility = "hidden";
    this.loading.style.height = "0px";
    this.loading.style.width = "0px";
  }

  login = () => {
    window.sessionStorage.setItem("admin_isLoggedIn", true);
    window.location.href = "/admin/dashboard";
  }

  handleSubmit(event) {
    event.preventDefault();
    var pwrd = document.getElementById("inputUsername").value;
    var uname = document.getElementById("inputPassword").value;
    this.loading.style.visibility = "visible";
    this.loading.style.height = "50px";
    this.loading.style.width = "50px";

    fetch('/api/blogData/GetAdmin?username='+pwrd+'&password='+uname, { method: 'POST' })
      .then(response => response.json()
        .then(data => {
          if (response.status === 200) {
            window.sessionStorage.setItem("infoJson", JSON.stringify(data));
            this.login();            
          }
        })
    ).catch(error => {
      
      this.message.style.visibility = "visible";
      this.message.style.height = "auto";
      this.loading.style.visibility = "hidden";
      this.loading.style.height = "0px";
      this.loading.style.width = "0px";
    });
  }

  render() {

    //let { from } = this.props.location.state || { from: { pathname: "/" } };
    //let { redirectToReferrer } = this.state;

    //if (redirectToReferrer) return <Redirect to='/admin/dashboard' />;


    return (
      <div className="container-fluid pt-5 bg-secondary">
        <div className="col-md-4 mx-auto py-3 bg-light">
          <p className=""><Link to="/">Back to blog</Link></p>
          <hr/>
          <form className="form-signin d-flex flex-column" onSubmit={this.handleSubmit}>
            <h2 className="text-center">Admin Login</h2>
            <div className="d-flex"><img className="mx-auto" src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" height="100" /></div>
            <div className="py-3">
              <input type="text" id="inputUsername" name="username" className="form-control" placeholder="Username" required auto="true" />
            </div>
            <div className="py-3">
              <input type="password" id="inputPassword" name="password" className="form-control" placeholder="Password" required />
            </div>
            <div id="remember" className="checkbox">
              <label>
                <input type="checkbox" value="remember-me"/> Remember me
              </label>
            </div>
            <div className="d-flex">
              <button className="btn btn-lg btn-primary btn-block btn-signin mt-2" type="submit">
                Sign in
              </button>
              <img id="loading" src="http://thinkfuture.com/wp-content/uploads/2013/10/loading_spinner.gif" height="50" />
            </div>
            <Link to="" className="forgot-password mt-2">
                Forgot the password?
            </Link>
            <div id="message" className="py-2">
              <hr />
              <p className="text-danger">Error signing in: Username or Password is incorrect.</p>
            </div>
          </form>
        </div>
      </div>
    );
  }
}
