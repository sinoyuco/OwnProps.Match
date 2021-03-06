import React from 'react';
import { withRouter, Link } from 'react-router-dom';

class SplashPage extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchUsers()

  }


  render() {
    return (
      <div className="entire-splash">
        <div className="top-of-splash">
          <img
            className="splash-logo"
            src="/images/main_logo.png"
            alt="My_Logo"
          />
          < br/>
        </div>

        <div className="meet-team-splash-button">
          <Link to="/team">
            <button className="splash-big-button">Meet the Team!</button>
          </Link>
        </div>

        <div className="signup-and-excel">
          <div className="splash-make-profile signup-list-item">
            Create a profile
            <img
              className="signup-and-excel-picture"
              src="/images/createprofile.png"
              alt="Sign_up"
            />
          </div>

          <div className="splash-edit-profile signup-list-item">
            <img
              className="signup-and-excel-picture"
              src="/images/language.png"
              alt="My_Logo"
            />
            Add the language you'd like to practice
          </div>

          <div className="splash-celebrate signup-list-item">
            Make friends and learn new things
            <img
              className="signup-and-excel-picture"
              src="/images/highfive.png"
              alt="My_Logo"
            />
          </div>
        </div>
        <div className="meet-team-splash-button">

        <Link to="/play">
          <button className="splash-big-button">
          Start Pairing Now
        </button>
        </Link>
        </div>
      </div>
    );
    
  }

}


export default withRouter(SplashPage);