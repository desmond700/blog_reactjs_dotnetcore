import { decorate, observable, action, runInAction } from 'mobx';
import { FetchDataFromServer } from './FetchDataFromServer';
import { isEmpty } from 'util';

export class UserStore {

  fetchData = new FetchDataFromServer();
  userData = {};
  userPosts = [];
  postData = {};
  recentPosts = [];
  comments = [];
  replies = [];
  makePostData = observable({
    title: null,
    article: null,
    category: null,
    feature: null
  });


  SignInUser(email, password) {
    return new Promise(async (resolve, reject) => {
      await fetch('api/BlogData/GetBlogger?email=' + email + '&password=' + password + '&isAdmin=' + false, { method: 'POST' })
        .then(response => {
          response.json().then(data => {
            runInAction(() => {
              console.log("fetch data: " + data.username);
              this.userData = data;
            });
            resolve(data.username);
          });
        }).catch(msg => reject(Error(msg)));
    });
  }

  RegisterUser(formData) {
    return new Promise(async (resolve, reject) => {
      await fetch('api/BlogData/RegisterBlogger?isAdmin=' + false,
        {
          method: 'POST',
          body: formData
        }
      ).then(response => {
        response.json().then(data => {
          runInAction(() => this.userData = data);
          resolve(data.username);
        });
      }).catch(error => reject(Error(error)));
    });
  }

  SignOut() {
    this.userData = {};

    return Object.getOwnPropertyNames(this.userData) === 0;
  }

  SetPostTitle(title) {
    this.makePostData.title = title;
  }

  SetPostCategory(category) {
    this.makePostData.category = category;
  }

  SetPostArticle(article) {
    this.makePostData.article = article;
  }

  SetPostFeature(feature) {
    this.makePostData.feature = feature;
  }

  PublishPost() {
    const formData = new FormData();
    const keys = Object.keys(this.makePostData);
    keys.forEach(key => {
      formData.append(key, this.makePostData[key]);
    });
    console.log(this.postData);
    fetch('api/blogData/MakePost?id=' + this.userData.id + '&isAdmin=' + this.userData.is_Admin, {
      method: 'POST',
      body: formData
    })
      .then(response => {
        response.json().then(result => {
          console.log("result:" + result);
        });
      }).catch(error => {
        console.log("error:" + error);
      });
  }

  FetchUserPosts() {
    return new Promise(async (resolve, reject) => {
      await fetch("api/BlogData/GetBloggersPosts?id=" + this.userData.id + "&isAdmin=" + this.userData.is_Admin)
        .then(response => {
          response.json().then(data => {

            resolve(data);
          });
        }).catch(error => reject(Error(error)));
    });
  }

  FetchPost(post_id) {
    return new Promise(async (resolve, reject) => {
      await fetch("api/BlogData/GetPost?id=" + post_id)
        .then(response => {
          response.json().then(data => {
            runInAction(() => {
              this.comments = data.comments;
              this.postData = data;
            });
            resolve(data);
          });
        }).catch(error => reject(Error(error)));
    });
  }

  FetchRecentPosts() {
    return new Promise(async (resolve, reject) => {
      await fetch("api/BlogData/GetRecentPosts")
        .then(response => {
          response.json().then(data => {
            resolve(data);
          });
        }).catch(error => reject(Error(error)));
    });
  }

  AddComment(comment) {
    fetch("api/BlogData/AddComment?isAdmin=" + this.userData.is_Admin,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          post_id: this.postData.post_id,
          blogger_id: this.userData.id,
          comment: comment
        })
      }).then(response => {
        response.json().then(data => {
          runInAction(() => this.comments = data);
        });
      }).catch(error => console.log(error));
  }

  AddCommentReply(comment_id, comment) {
      fetch("api/BlogData/AddReply?isAdmin=" + this.userData.is_Admin,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            post_id: this.postData.post_id,
            blogger_id: this.userData.id,
            comment_id: comment_id,
            comment: comment
          })
        }).then(response => {
          response.json().then(data => {
            runInAction(() => this.comments = data);
          });
        }).catch(error => console.log(error));
  }

  AddCommentLike(comment_id) {
    fetch("api/BlogData/AddCommentLike?isAdmin=" + this.userData.is_Admin,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          comment_id: comment_id,
          post_id: this.postData.post_id,
          blogger_id: this.userData.id
        })
      }).then(response => {
        response.json().then(data => {
          runInAction(() => this.comments = data);
        });
      }).catch(error => console.log(error));
  }

}

decorate(UserStore, {
  userData: observable,
  makePostData: observable,
  userPosts: observable,
  comments: observable,
  replies: observable,
  SignUser: action,
  SignOut: action,
  RegisterUser: action,
  SetTitle: action,
  SetCategory: action,
  SetArticle: action,
  SetFeature: action,
  PublishPost: action,
  FetchUserPosts: action,
  FetchPost: action,
  FetchRecentPosts: action,
  AddComment: action,
  AddCommentReply: action,
  AddCommentLike: action
});
