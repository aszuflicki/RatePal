import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import LandingPage from './landing/landing.component';
import NavBar from "./navbar/navbar.component";
import RegisterPage from "./register/register.component";
import UsersPage from "./users/users.component"
import ProfilePage from "./profile/profile.component";

class App extends Component {


  render() {
    return (
      <div>
        <BrowserRouter >
          <div>
            <NavBar />
            <Switch>
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/users" component={UsersPage} />
            <Route exact path="/register" component={RegisterPage} />
              <Route exact path="/" component={LandingPage} />

            </ Switch>
          </div>
        </ BrowserRouter>
      </div>
    );
  }
}

export default App;
