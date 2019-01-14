import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export class UserActivity extends React.Component {


  render() {

    const activities = ((data) => {
      if (data) {
        data.map((data, index) => {
          <div className="card col-md-12 mt-4" key={index}>
            <div className="card-body">
              <div className="d-flex">
                <div className="px-2">
                  <img className="img-fluid" src="https://www.jamf.com/jamf-nation/img/default-avatars/generic-user-purple.png" width="90" />
                </div>
                <div className="px-2">
                  <h5 className="card-title">
                    <b>activity title</b>
                  </h5>
                  <p className="card-text my-3">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                </div>
              </div>
            </div>
          </div>;
        });
      }
      else {
        return (<div className=" bg-light">
                  <p className="my-2 text-center"><b>You have no activity</b></p>
                </div>);
      }
    })(false);

    return (
      <div className="mt-5">
        {activities}
      </div>
    );
  }
} 
