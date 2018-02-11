import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {

    render() {

        return (
            <div className="container">
                <div className="jumbotron">
                    <h1 className="display-4">Hi, there!</h1>
                    <p className="lead">This is a simple web app.</p>

                </div>

                <div className="jumbotron">
                    <h1 className="display-4">Don't have an account?</h1>
                    <p className="lead">Register, by clicking button below</p>

                    <p className="lead">
                        <a className="btn btn-danger btn-lg" role="button"
                        onClick={()=>{
                            this.props.history.push("/register")
                        }}
                        >Register</a>
                    </p>
                </div>
            </div>
        )
    }
}



export default connect(null, {})(Landing);