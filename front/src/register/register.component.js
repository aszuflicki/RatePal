import React, { Component } from 'react';
import {connect} from 'react-redux';
import {createUser} from "./register.actions";

class Register extends Component {

    componentWillMount() {
        this.setState({username:"", fullName:"", msg:""})
    }

    submit(e){
        e.preventDefault();
        const {fullName, username} = this.state;
        this.props.createUser({
            fullName,
            username
        })
        
      }

    render() {



        return (
            <div className="container">

                <div class="jumbotron">
                    <h1 class="display-5">Register</h1>
                    <hr class="my-4" />
                    <form onSubmit={this.submit}>
                        <div class="form-group">
                            <label for="InputUsername">Username</label>
                            <input type="text" class="form-control" id="InputUsername" 
                            aria-describedby="emailHelp" placeholder="Enter username" 
                            onChange={(e) => {
                                this.setState({username:e.target.value})
                            }}
                            value={this.state.username}
                            />

                        </div>
                        <div class="form-group">
                            <label for="InputFullName">Full name</label>
                            <input type="text" class="form-control" id="InputFullName" 
                            aria-describedby="emailHelp" placeholder="Enter full name" 
                            onChange={(e) => {
                                this.setState({ fullName:e.target.value})
                            }}
                            value={this.state.fullName}
                            />
                            
                        </div>


                        <button type="submit" class="btn btn-primary">Register</button>
                    </form>
                </div>
            </ div >
        )
    }
}
function mapStateToProps(state) {
    return {
    }
}
    
export default connect(mapStateToProps, {createUser})(Register);

