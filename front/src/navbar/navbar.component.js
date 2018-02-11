import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { login, updateLoginField, logout } from "./navabr.actions";

class Navbar extends Component {

    constructor(props) {
        super(props);

    }


    submit(e) {
        e.preventDefault();
        const { field } = this.props;
        this.props.login({ username: field })
        this.render()
    }

    logout() {
        this.props.logout();
    }

    render() {


        let navEl;
        const form = (
            <form className="form-inline my-2 my-lg-0" onSubmit={this.submit.bind(this)}>
                <input className="form-control mr-sm-2" type="search"
                    placeholder="Username" aria-label="Search"
                    value={this.props.field}
                    onChange={(e) => { this.props.updateLoginField(e.target.value); }}
                />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Log In</button>
            </form>
        )

        if (!this.props.loggedIn) {
            navEl = form;
        } else {
            navEl = (
                <span className="navbar-text">
                    Hi! {this.props.fullName}

                    <button type="button" class="btn btn-outline-danger my-2 my-sm-0"
                    onClick={this.logout.bind(this)}
                    >Log out</button>
                </span>
            )
        }

        return (
            <div>
                <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                    <Link to="/">
                        <div className="navbar-brand"

                        >RatePal</div>
                    </Link>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">

                            <li className="nav-item active">
                                <Link to="/" className="nav-link">Home <span className="sr-only"></span></Link>
                            </li>

                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">My Profile</Link>
                            </li>

                            <li className="nav-item" >
                                <Link to="/users" className="nav-link" >Users </Link>
                            </li>
                        </ul>

                        {navEl}


                    </div>
                </nav>
                <div class="alert alert-danger" role="alert">
                    {this.props.msg}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)

    return {
        ...state.navbar
    }
}

function mapDispatchToProps(dispatch) {
    return {
        login: (values) => dispatch(login(values)),
        updateLoginField: (value) => dispatch(updateLoginField(value)),
        logout:() => dispatch(logout())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);