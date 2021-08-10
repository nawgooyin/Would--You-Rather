import React, { Component } from 'react';
import Questions from './Question';
import { connect } from 'react-redux';
import { handleSaveAnswer } from '../actions/questions';

class ChosenQuestion extends Component {
    state = {
        showResults: false
    }

    handleShowResults(answer) {
        const { dispatch } = this.props;
        const { question_id } = this.props.match.params;

        dispatch(handleSaveAnswer(question_id, answer))
            .then(() => {
                this.setState(() => ({
                    showResults: true
                }))
            })
    }

    render() {
        const { question, users, isAnswered } = this.props;
        const { showResults } = this.state; 
        
        return (
            <div>
                {isAnswered === 'false' && 
                    <h1>Would You Rather</h1>
                }
                <img src={users[question.author].avatarURL} width='200px' height='200px'/>
                {!showResults &&
                    <Questions question={question} users={users} isReadOnly={false} isAnswered={isAnswered} showResultAnswers={(answer) => this.handleShowResults(answer)}/> 
                }
                {(showResults || isAnswered === 'true') && 
                    <div className='question-info'>
                        <div>
                            <span>{question.optionOne.text}</span><br/>
                            <span>{question.optionOne.votes.length} out of {users.length} votes</span>
                        </div>
                        <br/>
                        <div>
                            <span>{question.optionTwo.text}</span><br/>
                            <span>{question.optionTwo.votes.length} out of {users.length} votes</span>
                        </div>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({ questions, users }, props) {
    const { question_id, isAnswered } = props.match.params;

    const questionArray = Object.keys(questions).map((question_id) => ({
        question_id: question_id,
        author: questions[question_id].author,
        optionOne: questions[question_id].optionOne,
        optionTwo: questions[question_id].optionTwo,
        timestamp: questions[question_id].timestamp
    }));

    const question = questionArray.find((question) => question.question_id === question_id);

	return {
        question,
        users,
        isAnswered
	};
}


export default connect(mapStateToProps)(ChosenQuestion);