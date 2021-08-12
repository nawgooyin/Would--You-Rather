import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { withRouter } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

class Login extends Component {
    loginUser = (id) => {
        const { dispatch } = this.props;

        dispatch(setAuthedUser(id));
    }

    render() {
        const { users, authedUser } = this.props;
        const { from } = this.props.location.state || { from: { pathname: '/home' } };

        console.log(this.props.location.state);

        if (authedUser) {
            return <Redirect to={from} />;
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

function mapStateToProps({ users, authedUser }) {
	return {
		users: Object.keys(users).map((id) => ({
			id: id,
			name: users[id].name
		})),
        authedUser
	};
}

export default withRouter(connect(mapStateToProps)(Login));