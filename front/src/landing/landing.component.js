import React, { Component } from 'react';
import { connect } from 'react-redux';

class Landing extends Component {

    render() {

        return (
            <div className="container">
                <div class="jumbotron">
                    <h1 class="display-4">Hi, there!</h1>
                    <p class="lead">This is a simple web app.</p>

                </div>

                <div class="jumbotron">
                    <h1 class="display-4">Don't have an account?</h1>
                    <p class="lead">Register, by clicking button below</p>

                    <p class="lead">
                        <a class="btn btn-danger btn-lg" role="button"
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

function mapStateToProps(state) {

}

export default connect(mapStateToProps, {})(Landing);