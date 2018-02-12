import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, selectUser } from './users.actions'
import { fetchSkills } from './../profile/skillsEdit/skillsEdit.actions'

class Users extends Component {

    componentWillMount() {
        this.props.fetchUsers();
    }

    renderUsersList(users, selected, select, fetchSkills) {

        return users.map(user => {
            return (
                <div className="card"
                    key={user.username}
                    onClick={() => { select(user); fetchSkills(user.username) }}
                >
                    {(user.username === selected) ? (<div className="card-header">Now edited</div>) : <div></div>}
                    <div className="card-body">
                        <h5 className="card-title">
                            {user.fullName}</h5>
                        <p className="card-text">{user.username}</p>

                    </div>
                </div>
            )
        })

    }
    renderTable(skills) {
        return (
            <table class="table table-striped ">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Average Rate</th>
                        <th scope="col"># of rates</th>
                        <th scope="col">Your rate</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map(skill => (
                        <tr>
                            <td>{skill._name}</td>
                            <td>
                            </td>
                            <td>
                            </td>
                            <td>
                                <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                    <label class="btn btn-secondary active">
                                        <input type="radio" name="options" id="option1" autocomplete="off" checked /> Struggling
                                    </label>
                                    <label class="btn btn-secondary">
                                        <input type="radio" name="options" id="option2" autocomplete="off" /> Need practice
                                    </label>
                                    <label class="btn btn-secondary">
                                        <input type="radio" name="options" id="option3" autocomplete="off" /> Expierienced
                                    </label>

                                    <label class="btn btn-secondary">
                                        <input type="radio" name="options" id="option3" autocomplete="off" /> Master
                                    </label>
                                </div>
                            </td>

                        </tr>
                    ))}


                </tbody>
            </table>
        )
    }


    renderSelected(user) {
        if (!user) { return(
                    <div class="jumbotron">
                    <p class="lead">Click on someone to rate this person skills.</p>
                    </div>
            )} else {
            console.log(user)

            return (
                <div className="col-10">
                    <div class="jumbotron">
                        <h1 class="display-5">{`${user.fullName} (${user.username})`}</h1>
                        <p class="lead">You can rate this user, by using forms below</p>
                        <hr class="my-4" />
                        {this.renderTable(this.props.skills)}

                    </div>
                </div>
            )
        }
    }

    render() {
        console.log(this.props)
        const { users, selected, selectUser, fetchSkills } = this.props;
        return (
            <div className="row">
                <div className="col-2">
                    {this.renderUsersList(users, selected, selectUser, fetchSkills)}

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
        ...state.users,
        ...state.skillsEdit,

    }
}

export default connect(mapStateToProps, { fetchUsers, selectUser, fetchSkills })(Users);