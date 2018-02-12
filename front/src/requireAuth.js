import React, {Component} from 'react';
import {connect} from 'react-redux';
import {checkLogin} from './navbar/navabr.actions';

export default function(CompToRender) {

    class Authentication extends Component {

        componentWillMount() {
            this.props.checkLogin()
        }

        componentDidMount() {
            if(this.props.loggedIn) {

            } else {
                this.props.history.push("/");
            }
        }

        render() {
            return <CompToRender />;
        }


    }

    function mapStateToProps(state) {
        return {
            loggedIn: state.navbar.loggedIn
        }
    }

    return connect(mapStateToProps, {checkLogin})(Authentication)
}