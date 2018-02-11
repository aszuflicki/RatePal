import React, { Component } from 'react';
import { connect } from 'react-redux';
import { createUser, updateFullNameField, updateUsernameField, updateMsgRegister } from "./register.actions";

class Register extends Component {



    submit(e) {
        //console.log(e)
        if (e) e.preventDefault();
        //alert("works")
        const { fullName, username } = this.props;

        if (fullName.length >= 3 || username.length >= 3) {
            this.props.createUser({
                fullName,
                username
            })
        } else {
            this.props.updateMsgRegister("Full name and username should be at least 3 characters long")
        }
            

    }

    render() {
        let alert;

        if (this.props.msg) {
            alert = (
                <div className="alert alert-danger" role="alert">
                    {this.props.msg}
                </div>
            )
        }


        if (this.props.created) {
            return (
                <div className="container">

                    <div className="jumbotron">
                        <h1 className="display-5">Your account is now created</h1>
                        <hr className="my-4" />
                        <div>
                            Please now log in and enjoy yourself ;)
                        </div>
                    </div>
                </ div >
            )
        } else
            return (
                <div className="container">

                    <div className="jumbotron">
                        <h1 className="display-5">Register</h1>
                        <hr className="my-4" />
                        {alert}
                        <form onSubmit={this.submit.bind(this)}>
                            <div className="form-group">
                                <label htmlFor="InputUsername">Username</label>
                                <input type="text" className="form-control" id="InputUsername"
                                    aria-describedby="emailHelp" placeholder="Enter username"
                                    value={this.props.username}
                                    onChange={(event) => this.props.updateUsernameField(event.target.value)}
                                />

                            </div>
                            <div className="form-group">
                                <label htmlFor="InputFullName">Full name</label>
                                <input type="text" className="form-control" id="InputFullName"
                                    aria-describedby="emailHelp" placeholder="Enter full name"
                                    value={this.props.fullname}
                                    onChange={(event) => this.props.updateFullNameField(event.target.value)}
                                />

                            </div>


                            <button type="submit" className="btn btn-primary">Register</button>
                        </form>
                    </div>
                </ div >
            )
    }
}
function mapStateToProps(state) {
    //console.log(state.register)
    return {
        ...state.register
    }
}

export default connect(mapStateToProps, { createUser, updateFullNameField, updateUsernameField, updateMsgRegister })(Register);

