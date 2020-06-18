import React from 'react';
import { Link, Redirect, Route } from 'react-router-dom';

class NavBar extends React.Component{
  constructor(props){
    super(props);

  }

  showNav(){
    let dropdown = document.getElementsByClassName("hidden-nav-dropdown")[0]
    dropdown.className ="show-nav-dropdown"
  }

  hideNav(){
    let dropdown = document.getElementsByClassName("show-nav-dropdown")[0]
    dropdown.className ="hidden-nav-dropdown"

  }

  componentDidMount() {

    this.props.fetchNotifications(this.props.currentUser.id);

  }


  notification(){
    
    if (this.props.currentUser === undefined) {

      return(
        <>
        </>
      )

    } else if (this.props.notifications.length === 0) {

      return (

        <h3 id="some-notificaitons"
          onMouseEnter={this.showNav}
          onMouseLeave={this.hideNav}
        >
          V
          <div className="hidden-nav-dropdown">
            <h5>Nobody likes you :(</h5>
            <img
              src="/images/emo_character.png"
              alt=""
              height='200'
              width='200'
            />
          <Link to='/play' id='dropdown-text' className='no-notif-dropdown'>
            <p>Find a Pair!</p>
          </Link>

            <Link to='/show' id='dropdown-text' className='no-notif-dropdown'>
            <p>Your Profile</p>
          </Link>
          </div>
          
        </h3>
      );

    } else {
      let top3 = this.props.notifications.slice(0, 2);

          return (
            <Link to='/notifications'>
              <h3 id="some-notificaitons"
                onMouseEnter={this.showNav}
                onMouseLeave={this.hideNav}
              >
                V
                <div className="hidden-nav-dropdown">
                  <div className='match-notifs'>
                    {top3.map((notif, idx) => (  
                      
                      <p id='dropdown-text-match'>You have a new match!</p>

                    
                      )
                      )}
                    <Link to='/notifications' id='dropdown-text'>
                      <p>See all</p>
                    </Link>

                    <Link to='/play' id='dropdown-text'>
                      <p>Find a Pair!</p>
                    </Link>

                    <Link to='/show' id='dropdown-text'>
                      <p>Your Profile</p>
                    </Link>
                  </div>
                  
                </div>
              </h3>
            </Link>
            
          )
        
      }
  }

 

  logInOrSignUpButton() {

    if (this.props.currentUser === undefined || Object.values(this.props.currentUser).length === 0) {

      return (
        <li className="nav-signin-login-buttons">
          <Link to="/login" >
          <button className="navbar-button">Log In</button>
        </Link>

        <Link to="/signup" > 
          <button className="navbar-button">Sign Up</button>
        </Link>
        </li>
      );
    } else {
      return (
        <li className="nav-logout-button">
            <button 
            onClick={() => this.props.logout()}
            className="navbar-button">Log Out</button>
        </li>
      );
    }
  }

  render(){

    return (

      <nav className="nav-bar">
        {/* {this.handleNotifications()} */}
        <Link to="/" style={{ marginRight: "33%" }}>
          <img
            src="/images/main_logo_no_text.png"
            alt=""
            height="60"
            width="200"
          />
        </Link>
        <ul>
            {this.logInOrSignUpButton()}
          <li>
            <Link to="/">
              <button className="navbar-button">Home</button>
            </Link>
          </li>
          <li className="notification-list-item" >
            {this.notification()}

          </li>
        </ul>
      </nav>
    );
  }
}

export default NavBar;