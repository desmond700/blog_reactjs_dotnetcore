import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { observer, inject } from 'mobx-react';

export const ViewPosts = inject("userStore")(observer(class ViewPosts extends Component {

  constructor() {
    super();
    this.state = {
      data: []
    };
  }

  componentWillMount() {
    this.props.userStore.FetchUserPosts().then(data => {
      this.setState({ data });
    });
  }

  render() {
    let { data } = this.state;

    let tr = data.map((data, i) => {
      return <tr key={i}>
        <td scope="row">{data.post_id}</td>
        <td><Link to={`${this.props.match.url}/${data.post_id}`}>{data.post_title}</Link></td>
        <td>{data.author}</td>
        <td>{data.category}</td>
        <td>{data.post_comment_count}</td>
        <td>{data.post_date}</td>
      </tr>;
    });

    return (
      <div className="pt-3">
        <div>Posts <button to="admin/post/makeapost" className="btn border">New post</button></div>
        <div className="row justify-content-between my-4">
          <nav className="d-flex">
            <ol className="organise-post my-auto">
              <li><Link to="#">All</Link>()</li>
              <li><Link to="#">Published</Link>()</li>
              <li aria-current="page"><Link to="">Draft</Link>()</li>
            </ol>
          </nav>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn border my-2 my-sm-0" type="submit">Search Post List</button>
          </form>
        </div>
        <div className="row justify-content-between">
          <div className="d-flex">
            <select className="form-control">
              <option value="#">Action</option>
              <option value="dropdown-item">Another action</option>
              <option value="dropdown-item">Something else here</option>
            </select>
            <button className="btn border ml-2">Apply</button>
          </div>
          <nav aria-label="...">
            <ul className="pagination">
              <li className="page-item disabled">
                <a className="page-link" href="#" tabIndex="-1" aria-disabled="true">Previous</a>
              </li>
              <li className="page-item">
                <a className="page-link active" href="#" aria-current="page">
                  1 <span className="sr-only">(current)</span>
                </a>
              </li>
              <li className="page-item disabled">
                <a className="page-link" href="#" aria-disabled="true">Next</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mt-3">
          <table className="table">
            <caption>List of users</caption>
            <thead>
              <tr>
                <th scope="col">Post id</th>
                <th scope="col">Title</th>
                <th scope="col">Author</th>
                <th scope="col">Category</th>
                <th scope="col"><FontAwesomeIcon icon='comment' /></th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {tr}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
})); 
