import React, { Component } from 'react';
import {connect} from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './landing/landing.component';
import NavBar from "./navbar/navbar.component";
import RegisterPage from "./register/register.component";
import UsersPage from "./users/users.component"
import ProfilePage from "./profile/profile.component";
import auth from './requireAuth';
import { checkLogin } from './navbar/navabr.actions';

class App extends Component {
  componentWillMount() {
    this.props.checkLogin()
  }


  render() {
    return (
      <div>
        <BrowserRouter >
          <div>
            <NavBar />
            <Switch>
              <Route exact path="/profile" component={auth(ProfilePage)} />
              <Route exact path="/users" component={auth(UsersPage)} />
              <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/" component={LandingPage} />

            </ Switch>
          </div>
        </ BrowserRouter>
      </div>
    );
  }
}

export default connect(null, {checkLogin})(App);
