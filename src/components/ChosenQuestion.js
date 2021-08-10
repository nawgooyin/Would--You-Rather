import React, { Component } from 'react';
import Questions from './Question';
import { connect } from 'react-redux';

class ChosenQuestion extends Component {
    state = {
        showResults: false
    }

    render() {
        const { question, users, isAnswered } = this.props;

        return (
            <div>
                <Questions question={question} users={users} isReadOnly={false} isAnswered={isAnswered} /> 
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