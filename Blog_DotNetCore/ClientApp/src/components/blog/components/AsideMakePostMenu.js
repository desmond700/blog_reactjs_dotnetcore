import React, { Component } from 'react';
import { observer, inject } from 'mobx-react';
//import './NavMenu.css';

export const AsideMakePostMenu = inject("userStore")(observer(class AsideMakePostMenu extends Component {
  displayName = AsideMakePostMenu.name

  constructor(props) {
    super(props);
    this.state = {
      imagePreviewUrl: ""
    };
  }

  onChange = (e) => {
    const file = e.target.files[0];
    let reader = new FileReader();

    this.props.userStore.SetPostFeature(file);

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  render() {

    let { imagePreviewUrl } = this.state;
    let imagePreview = null;

    if (imagePreviewUrl) {
      imagePreview = <img className="img-fluid" src={imagePreviewUrl} width="250" />;
    } else {
      imagePreview = (
        <div className="previewText">
          Please select an image for Preview
        </div>
      );
    }

    return (
      <div>
        <div className="border px-2 py-2 mt-5">
          <h5>Publish</h5>
          <hr />
          <p>Status: <b>Not published</b></p>
          <p>Visibility: <b>Not visible</b></p>
          <hr />
          <div className="d-flex flex-row">
            <button className="btn btn-secondary ml-auto" onClick={() => this.props.userStore.PublishPost()}>Publish post</button>
          </div>
        </div>

        <div className="border mt-3 px-2 py-2">
          <h5>Category</h5>
          <hr />
          <select multiple onChange={(e) => this.props.userStore.SetPostCategory(e.target.value)} className="form-control">
            <option>Select a category</option>
            <option value="1">Creativity</option>
            <option value="2">Technology</option>
            <option value="3">Lifestyle</option>
            <option value="4">Food</option>
            <option value="5">Travel</option>
          </select>
        </div>

        <div className="border mt-3 px-2 py-2">
          <h5>Feature</h5>
          <hr />
          <input type="file" className="form-control-file" onChange={this.onChange} />
          <div className="mt-3 py-2 px-2">
            {imagePreview}
          </div>
        </div>
      </div>
    );
  }
}));
