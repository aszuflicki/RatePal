import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {

    register(isLogged) {
        if (!isLogged) {
            return (
                <div className="jumbotron">
                    <h1 className="display-4">Don't have an account?</h1>
                    <p className="lead">Register, by clicking button below</p>

                    <p className="lead">
                        <a className="btn btn-danger btn-lg" role="button"
                            onClick={() => {
                                this.props.history.push("/register")
                            }}
                        >Register</a>
                    </p>
                </div>
            )
        } else {
            return (<div> </div>)
        }
    }

    render() {

        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Hi, there!</h1>
                    <p className="lead">This is a simple "rate-your-pal" kind of app.</p>

                </div>


                {this.register(false)}
            </div>
        )
    }
}

function mapStateToProps(state) {

    return {
        ...state.navbar
    }
}


export default connect(mapStateToProps, {})(Landing);