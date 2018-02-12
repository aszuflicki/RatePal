import React, { Component } from 'react';
import { connect } from 'react-redux'
import SkillsEdit from './skillsEdit/skillsEdit.component';
class Profile extends Component {



    render() {
        if (this.state) {
            if (this.state.navbar) {
                console.log(this.state.navbar)
            }
        }


        return (
            <div className="container">
                 <SkillsEdit />
                
                <div class="jumbotron">
                    <h1 class="display-4">My profile</h1>
                    <hr class="my-4" />
                    <p>{`Full name: ${this.props.fullName}`}</p>
                    <p>{`Username: ${this.props.username}`}</p>

                </div>
            </div>
        )
    }
}
// const xd = (<div><p>Full name: {this.state.navbar.fullName}</p>
//     <p>Username: {this.state.navbar.username}</p> </div>)
function mapStateToProps(state) {
    return {
        username: state.navbar.username || "username",
        fullName: state.navbar.fullName || "Full name"
    }
}
export default connect(mapStateToProps, {})(Profile)
