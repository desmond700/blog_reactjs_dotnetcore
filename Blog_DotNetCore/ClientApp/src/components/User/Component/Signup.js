import React from 'react';
import { observer, inject } from 'mobx-react';

export const SignUp = inject("userStore")(observer(class SignUp extends React.Component {
  displayName = SignUp.name

  constructor() {
    super();
    this.state = {
      firstname: null,
      lastname: null,
      username: null,
      email: null,
      password: null,
      imageFile: null,
      imagePreviewUrl: null
    };
  }

  onSubmitForm = (e) => {
    e.preventDefault();

    const firstname = e.target[0].value;
    const lastname = e.target[1].value;
    const username = e.target[2].value;
    const email = e.target[3].value;
    const password = e.target[4].value;
    const confirmPassword = e.target[5].value;

    this.setState(
      {
        firstname: firstname,
        lastname: lastname,
        username: username,
        email: email,
        password: password
      },
      this.prepareFormData
    );
  }

  prepareFormData = () => {

    const formData = new FormData();

    Object.keys(this.state).filter((key) => {
      if (key !== 'imagePreviewUrl')
        return true;
    }).map((key) => {
      formData.append(key, this.state[key]);
    });

    this.props.userStore.RegisterUser(formData)
      .then(data => {
        this.props.history(`/user/${data}/overview`);
    });
  }

  onChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {
    let { imagePreviewUrl } = this.state;
    let imagePreview = null;

    if (imagePreviewUrl) {
      imagePreview = <img className="img-fluid" style={{ position: "absolute", left: "100%" }} src={imagePreviewUrl} width="50" />;
    } else {
      imagePreview = (
        <div className="previewText">
          Please select an image for Preview
        </div>
      );
    }

    return (
      <div className="col-sm-6 col-md-4 col-lg-6 mx-auto mt-4">
        <h3 className="my-3">Sign up</h3>
        <form onSubmit={this.onSubmitForm}>
          <div className="form-group">
            <label htmlFor="exampleInputFirstname">Firstname</label>
            <input type="text" className="form-control" id="exampleInputFirstname" placeholder="First name" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputLastname">Lastname</label>
            <input type="text" className="form-control" id="exampleInputLastname" placeholder="Last name" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputUsername">Username</label>
            <input type="text" className="form-control" id="exampleInputUsername" placeholder="Username" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputEmail">Email address</label>
            <input type="email" className="form-control" id="exampleInputEmail" aria-describedby="emailHelp" placeholder="Enter email" />
            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword">Password</label>
            <input type="password" className="form-control" id="exampleInputPassword" placeholder="Password" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputConfirmPassword">Confirm password</label>
            <input type="password" className="form-control" placeholder="Confirm password" required />
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputProfilePic">Profile picture</label>
            <div className="d-flex">
              <input type="file" className="form-control-file" onChange={this.onChange} placeholder="Profile picture" />
              {imagePreview}
            </div>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
}));
