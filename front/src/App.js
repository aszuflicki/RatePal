import React, { Component } from 'react';
import LandingPage from './landing/landing.component';
import NavBar from "./navbar/navbar.component";

class App extends Component {


  render() {
    return (
      <div>
        <NavBar />
        <LandingPage />
        Helo there! <br />
        General React
      </div>
    );
  }
}

export default App;
