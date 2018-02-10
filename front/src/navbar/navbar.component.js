import React, { Component } from 'react';
import Link from 'react-router-dom';
import { connect } from 'react-redux';

class Navbar extends Component {

    render() {

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <div className="navbar-brand"
                    
                    >RatePal</div>
                  

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item active">
                                <a className="nav-link">Home <span className="sr-only"></span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" >My Profile</a>
                            </li>
                            <li className="nav-item" >
                                <a className="nav-link" >Users</a>
                            </li>

                        </ul>
                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="search" placeholder="Username" aria-label="Search" />
                            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button>
                        </form>
                    </div>
                </nav>
            </div>
        )
    }
}

function mapStateToProps(state) {
    
    return {
        
    }
}

export default connect(mapStateToProps, {})(Navbar);