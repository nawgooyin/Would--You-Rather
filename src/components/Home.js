import React, { Component } from 'react';
import { connect } from 'react-redux';
import Questions from './Question';

class Home extends Component {
    state = {
        isAnswered: false,
        isReadOnly: true
    }

    setQuestionList = () => {
        this.setState((currentState) => ({
            isAnswered: !currentState.isAnswered
        }))
    }

    render() {
        const { questions, authedUser, users } = this.props;
        const { isAnswered, isReadOnly } = this.state;

        const unansweredQuestions = authedUser
            ? questions.filter((question) => !Object.keys(users[authedUser]?.answers).includes(question.id)) 
                .sort((a, b) => b.timestamp - a.timestamp)
            : [];
        const answeredQuestions = authedUser
            ? questions.filter((question) => Object.keys(users[authedUser]?.answers).includes(question.id))
                .sort((a, b) => b.timestamp - a.timestamp)
            : [];

        const showQuestions = isAnswered ? answeredQuestions : unansweredQuestions;

        return (
            <div>
                <ul>
                    <div>
                        <div>
                            <button disabled={!isAnswered} onClick={() => {this.setQuestionList()}}>Unanswered Questions</button>
                            <button disabled={isAnswered} onClick={() => {this.setQuestionList()}}>Answered Questions</button>
                        </div><br/>
                        {!authedUser &&
                            <div>Please log in to view questions.</div>
                        }
                        <div>
                            <ul>
                                {showQuestions.map((question) => (
                                    <li key={question.id}>
                                        <Questions question={question} users={users} isReadOnly={isReadOnly} isAnswered={isAnswered}/>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </ul>
            </div>
        )
    }
}

function mapStateToProps({ questions, authedUser, users }) {
	return {
        authedUser,
        questions: Object.keys(questions).map((id) => ({
			id: id,
			author: questions[id].author,
            optionOne: questions[id].optionOne,
            optionTwo: questions[id].optionTwo,
            timestamp: questions[id].timestamp
		})),
        users
	};
}

export default connect(mapStateToProps)(Home);