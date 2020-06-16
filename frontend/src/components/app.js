import React from 'react';
import { AuthRoute, ProtectedRoute } from '../util/route_util';
import { Switch, Route } from 'react-router-dom';
import NavBarContainer from "./navbar/navbar_container";
import LoginFormContainer from './session/login_form_container';
import SignupFormContainer from './session/signup_form_container';
import SplashPageContainer from './splash/splash_page_container';
import UserShowContainer from './users/user_show_container';
import PlayContainer from './play/play_container'


const App = () => (
    <div>
        <NavBarContainer />
        <Switch>
            <Route exact path="/" component={SplashPageContainer} />
            <Route exact path="/play" component={PlayContainer} />
            <ProtectedRoute path='/show' component={UserShowContainer}/>
            <AuthRoute exact path="/login" component={LoginFormContainer} />
            <AuthRoute exact path="/signup" component={SignupFormContainer} />
        </Switch>
    </div>
);

export default App;