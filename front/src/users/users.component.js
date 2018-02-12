import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchUsers, selectUser, updateRate, updateSearchField } from './users.actions'
import { fetchSkills, } from './../profile/skillsEdit/skillsEdit.actions'

class Users extends Component {

    style = { height: "75vh", overflowY: "scroll", overflowX: "hidden", }

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
    skillAvg(skill) {
         (skill)
        let sum = 0;
        for (let key in skill) {
            if (key != "_name" && key != "_id")
                sum += skill[key];
        }
        const number = Object.keys(skill).length - 2;
        let avg = (number > 0) ? Math.round(sum * 1000 / number) / 1000 : "-";



        return avg;
    }

    averageRate(avg) {
        let rate = "";
        if (avg >= 4.5) rate = " Master"
        else if (avg >= 2.5) rate = " Experienced"
        else if (avg >= 1.5) rate = " Need practice"
        else if (avg >= 1) rate = " Struggling"
        else rate = "No rates";


        return rate;
    }

    styleForTable = { height: "50vh", overflowY: "scroll", overflowX: "hidden", }

    renderTable(skills, user, selected, fetchSkills) {
        return (
            <div style={this.styleForTable} >
                <table class="table table-striped ">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Average</th>
                            <th scope="col">Rate</th>
                            <th scope="col"># of rates</th>
                            <th scope="col">Your rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        {skills.map(skill => (
                            <tr key={skill._name}>
                                <td>{skill._name}</td>
                                <td>
                                    {this.skillAvg(skill)}
                                </td>
                                <td>
                                    {this.averageRate(this.skillAvg(skill))}
                                </td>
                                <td>
                                    {Object.keys(skill).length - 2}
                                </td>
                                <td>

                                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                        <label className={`btn btn-secondary ${skill[user] === 1 ? "active" : ""}`}
                                        >
                                            <input type="radio" name="options" id="option1" onClick={() => {
                                                updateRate(skill._id.$oid, 1, selected, fetchSkills)
                                            }} /> Struggling
                                    </label>
                                        <label className={`btn btn-secondary ${skill[user] === 2 ? "active" : ""}`}>
                                            <input type="radio" name="options" id="option2" onClick={() => {
                                                updateRate(skill._id.$oid, 2, selected, fetchSkills)
                                            }} /> Need practice
                                    </label>
                                        <label className={`btn btn-secondary ${skill[user] === 3 ? "active" : ""}`}>
                                            <input type="radio" name="options" id="option3" onClick={() => {
                                                updateRate(skill._id.$oid, 3, selected, fetchSkills)
                                            }} /> Expierienced
                                    </label>

                                        <label className={`btn btn-secondary ${skill[user] === 4 ? "active" : ""}`}>
                                            <input type="radio" name="options" id="option3" onClick={() => {
                                                updateRate(skill._id.$oid, 4, selected, fetchSkills)
                                            }} /> Master
                                    </label>
                                    </div>
                                </td>

                            </tr>
                        ))}
                    </tbody>


                </table>
            </div>
        )
    }

    renderSelected(user, username, fetchSkills) {
        if (!user) {
            return (
                <div class="jumbotron">
                    <p class="lead">Click on someone to rate this person skills.</p>
                </div>
            )
        } else {
             (user)

            return (
                <div className="col-10">
                    <div class="jumbotron">
                        <h1 class="display-5">{`${user.fullName} (${user.username})`}</h1>
                        <p class="lead">You can rate this user's skills, by using forms below</p>
                        <hr class="my-4" />
                        {this.renderTable(this.props.skills, username, user, () => fetchSkills(user.username))}

                    </div>
                </div>
            )
        }
    }

    filterUsers(list, search) {
        return list.filter(value => value.fullName.toLowerCase().indexOf(search.toLowerCase()) !== -1)
    }

    render() {
        // (this.props)
        const { users, selected, selectUser, fetchSkills, field } = this.props;
        return (
            <div className="row" style={{padding: "20px"}}>


                <div className="col-2" >
                    <div class="form-group">
                        <input type="text" class="form-control" id="input"
                            placeholder="Search"
                            value={this.props.field}
                            onChange={e => this.props.updateSearchField(e.target.value)}
                        />
                    </div>
                    <div style={this.style}>
                        {this.renderUsersList(this.filterUsers(users, field), selected, selectUser, fetchSkills)}
                    </div>

                </div>
                <div className="col-10">
                    {this.renderSelected(this.props.selected, this.props.username, fetchSkills)}

                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
     (state)
    return {

        ...state.skillsEdit,
        username: state.navbar.username,
        ...state.users,

    }
}

export default connect(mapStateToProps, {
    fetchUsers, selectUser, fetchSkills,
    updateRate, updateSearchField
})(Users);