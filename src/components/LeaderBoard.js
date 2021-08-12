import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
    render() {
        const { users, authedUser } = this.props;

        return (
            <div>
                {!authedUser &&
                    <div>Please log in to view the leaderBoard.</div>
                }
                {authedUser &&
                    <div>
                        <h3>Leaderboard</h3>
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>
                                    <div className='question-info'>
                                        <span>{user.name}</span>
                                        <img src={user.avatarURL} alt={`Avatar of ${user.name}`} width='100px' height='100px'/>
                                        <span>Answered Questions: {user.answers.length}</span>
                                        <span>Created Questions: {user.questions.length}</span>
                                        <span>Total Score: {user.answers.length + user.questions.length}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                }   
            </div>
        )
    }
}


function mapStateToProps({ users, authedUser }) {
	return {
        users: Object.keys(users).map((id) => ({
			id: id,
			name: users[id].name,
            avatarURL: users[id].avatarURL,
            answers: Object.keys(users[id].answers),
            questions: Object.keys(users[id].questions)
		})).sort((a, b) => (b.answers.length + b.questions.length) - (a.answers.length + a.questions.length)),
        authedUser
	};
}

export default connect(mapStateToProps)(LeaderBoard);