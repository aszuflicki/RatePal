import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers } from './users.actions'

class Users extends Component {

    componentWillMount() {
        this.props.fetchUsers();
    }

    renderUsersList(users) {
        console.log(users)

        return users.map(user => {
            return (
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">
                            {user.fullName}</h5>
                        <p className="card-text">{user.username}</p>

                    </div>
                </div>
            )
        })

    }

    renderSelected(user) {
        if(!user) {
            return (
                <div>
Click someone to rate
                    </div>
            )
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-2">
                    {this.renderUsersList(this.props.users)}

                </div>
                <div className="col-10">
                {this.renderSelected(this.props.selected)}

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    console.log(state)
    return {
        ...state.users
    }
}

export default connect(mapStateToProps, { fetchUsers })(Users);