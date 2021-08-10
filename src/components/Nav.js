import React, { Component } from 'react'
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux';
import { logOutUser } from '../actions/authedUser';
import { Link, withRouter } from 'react-router-dom';

class Nav extends Component {
    logout = (id) => {
        const { dispatch } = this.props;

        dispatch(logOutUser(id));
    };

    render() {
        const { user } = this.props;

        return (
            <nav className='nav'>
                <ul>
                    <li>
                        <NavLink to='/' exact activeClassName='active'>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/add' activeClassName='active'>
                            New Question
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/leaderBoard' activeClassName='active'>
                            LeaderBoard
                        </NavLink>
                    </li>
                    <li>
                        {user && 
                            <div>
                                <span className='name-padding'>Welcome {user.name}!</span>
                                <Link to='/login'>
                                    <button onClick={() => this.logout(user.id)}>
                                        logout
                                    </button>
                                </Link>
                            </div>
                        }
                        {!user && 
                            <NavLink to='/login' activeClassName='active'>
                                Login
                            </NavLink>
                        }
                    </li>
                </ul>
            </nav>
        )
    }
}

function mapStateToProps({ users, authedUser }) {
	return {
		user: users[authedUser]
	};
}

export default withRouter(connect(mapStateToProps)(Nav));