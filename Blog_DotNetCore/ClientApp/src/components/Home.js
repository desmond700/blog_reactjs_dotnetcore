import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class Home extends Component {
  displayName = Home.name

  constructor(props) {
    super(props);
    this.state = {
      data: null
    };
  }

  componentWillMount() {
    fetch("api/BlogData/Test")
      .then(response => {
        response.json().then(data => {
          console.log(data);
        });
      }).catch(error => {
        console.log(error);
      });
  }

  fetchOnLoad = () => {
    fetch("/api/BlogData/Test").then(response => {
      response.json().then(data => {
        console.log( data );
      });
    });
  }

  render() {
    return (
      <div className="col-sm-12 col-md-12 col-lg-10 mx-auto">
        <div className="card border border-0">
          <div className="mt-2">
            <h2>Post title</h2>
            <p>by <small>John Doe</small></p>
          </div>
          <div className="d-flex py-2">
            <p className=""><FontAwesomeIcon icon="calendar" /> Date</p>
            <p className="ml-5"><FontAwesomeIcon icon="folder-open" /> Category</p>
            <p className="ml-5"><FontAwesomeIcon icon="comment" /> Comments </p>
          </div>
          <img className="card-img-top" src="http://onlineincometeacher.com/wp-content/uploads/2012/05/6-Top-Tips-About-Online-Article-Writing-For-Business.jpg" />
          <div className="card-body border py-2 mb-3 bg-light">
            <div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum,
                nisi lorem egestas vitae scel<span id="dots">...</span><span id="more" style={{display:"none"}}>erisque enim ligula venenatis dolor.
                Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum augue ut aliquet.
                Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed
                ornare turpis. Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum.
                Sed dapibus pulvinar nibh tempor porta.</span></p>

              <button id="myBtn" className="btn btn-dark">Read more</button> 
            </div>
          </div>
        </div>
      </div>
    );
  }
}
