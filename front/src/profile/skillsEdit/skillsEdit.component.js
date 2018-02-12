import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSkills, updateSkillField, addSkill, deleteSkill } from './skillsEdit.actions'

class SkillsEdit extends Component {

    componentWillMount() {
        this.props.fetchSkills(this.props.username);
    }
    skillAvg(skill) {
        let sum = 0;
        for (let key in skill) {
            if (key != "_name" && key != "_id")
                sum += skill[key];
        }
        const number = Object.keys(skill).length - 2;
        return (number === 0) ? 0 : sum / number;
    }

    renderTable(skills) {
        return (
            <table class="table table-striped table-dark">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Average Rate</th>
                        <th scope="col"># of rates</th>
                        <th scope="col">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {skills.map(skill => (
                        <tr>
                            <td>{skill._name}</td>
                            <td>{this.skillAvg(skill)}</td>
                            <td>{Object.keys(skill).length - 2}</td>
                            <td>
                                <button type="button" class="btn btn-danger"
                                onClick={() => {
                                    console.log(skill._id.$oid)
                                    this.props.deleteSkill(skill._id.$oid, this.props.fetchSkills(this.props.username))
                                
                                }}
                                >Delete</button></td>
                        </tr>
                    ))}


                </tbody>
            </table>
        )
    }



    render() {
        console.log(this.props)
        return (
            <div>
                <div class="jumbotron">
                    <h1 class="display-4">My skills</h1><div class="input-group mb-3">
                        <input type="text" class="form-control" placeholder="Skill name"
                            aria-label="Recipient's username" aria-describedby="basic-addon2"
                            value={this.props.field}
                            onChange={(e) => this.props.updateSkillField(e.target.value)}
                        />
                        <div class="input-group-append">
                            <button class="btn btn-outline-secondary" type="button"
                                onClick={() => {
                                    this.props.addSkill(this.props.field, () => {
                                        this.props.fetchSkills(this.props.username);
                                    });
                                    this.props.updateSkillField("");
                                }}
                            >Add</button>
                        </div>
                    </div>
                    <hr class="my-4" />

                    {this.renderTable(this.props.skills)}



                </div>
            </div>
        )

    }
}

function mapStateToProps(state) {
    //console.log(state.skillsEdit);
    return {
        ...state.skillsEdit,
        username: state.navbar.username
    }
}

export default connect(mapStateToProps, { fetchSkills, updateSkillField, addSkill, deleteSkill })(SkillsEdit)