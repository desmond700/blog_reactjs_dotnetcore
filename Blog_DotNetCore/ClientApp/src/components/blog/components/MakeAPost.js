import React, { Component } from 'react';
import RichTextEditor from 'react-rte';
import autobind from 'class-autobind';
import { observer, inject } from 'mobx-react';

export const MakeAPost = inject("userStore")(observer(class MakeAPost extends Component {

  constructor() {
    super(...arguments);
    autobind(this);
    this.state = {
      value: RichTextEditor.createEmptyValue()
    };
  }


  onChange = (value) => {
    this.setState({ value });
    this.props.userStore.SetPostArticle(value.toString('html'));
    console.log("value:");
    console.log(value.toString('html'));

  };

  onTextChange = (e) => {
    console.log(e.target.value);
    this.props.userStore.SetPostTitle(e.target.value);
  }

  render() {

    return (
      <div className="container-fluid pt-3">
        <h3 className="mb-3">Make a post</h3>
        <div className="py-2 mb-4">
          <input type="text" id="titleInput" className="form-control" placeholder="Title" onChange={this.onTextChange} />
        </div>

        <div>
          <RichTextEditor
            value={this.state.value}
            placeholder={"Tell your story"}
            onChange={this.onChange}
          />

        </div>
      </div>
    );
  }
}));
