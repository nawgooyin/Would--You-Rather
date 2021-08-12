import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';

class Login extends Component {
    state = {
        redirectToReferrer: false
    }

    loginUser = (id) => {
        const { dispatch } = this.props;

        dispatch(setAuthedUser(id));

        this.setState(() => ({
            redirectToReferrer: true
        }))
    }

    render() {
        const { users } = this.props;

        if (this.state.redirectToReferrer === true) {
            this.props.history.goBack()
        }

        return (
            <div>
                <h4>Click on a user to log in</h4>
                <ul>
                    {users.map((user) => (
                        <li key={user.id}>
                            <button onClick={() => this.loginUser(user.id)}>
                                {user.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

function mapStateToProps({users}) {
	return {
		users: Object.keys(users).map((id) => ({
			id: id,
			name: users[id].name
		}))
	};
}

export default withRouter(connect(mapStateToProps)(Login));