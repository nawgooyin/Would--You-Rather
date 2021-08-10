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
        const { question, users, isAnswered, authedUser } = this.props;
        const { showResults } = this.state; 

        let totalVotes;
        let optionOnePercent;
        let optionTwoPercent;

        if (this.props) {
            totalVotes = question?.optionOne.votes.length + question?.optionTwo.votes.length;
            optionOnePercent = Math.floor((question?.optionOne.votes.length / totalVotes) * 100);
            optionTwoPercent = Math.floor((question?.optionTwo.votes.length / totalVotes) * 100);
        }

        return (
            <div>
                {(authedUser && question) && 
                    <div>
                        {(isAnswered === 'false' && !showResults) && 
                            <h1>Would You Rather</h1>
                        }
                        <img src={users[question?.author]?.avatarURL} width='200px' height='200px'/>
                        {!showResults &&
                            <Questions question={question} users={users} isReadOnly={false} isAnswered={isAnswered} showResultAnswers={(answer) => this.handleShowResults(answer)}/> 
                        }
                        {(showResults || isAnswered === 'true') && 
                            <div className='question-info'>
                                <div>
                                    <span>{question.optionOne.text}</span><br/>
                                    {question.optionOne.votes.includes(authedUser) && 
                                        <div className='chosen-answer'></div>
                                    }
                                    <span>{question.optionOne.votes.length} out of {totalVotes} votes ({optionOnePercent}%)</span>
                                </div>
                                <br/>
                                <div>
                                    <span>{question.optionTwo.text}</span><br/>
                                    {question.optionTwo.votes.includes(authedUser) && 
                                        <div className='chosen-answer'></div>
                                    }
                                    <span>{question.optionTwo.votes.length} out of {totalVotes} votes ({optionTwoPercent}%)</span>
                                </div>
                            </div>
                        }
                    </div>
                }
                {(!authedUser) &&
                    <div>Please log in to view the poll.</div>
                }
                {!question &&
                    <div>
                        <h1>404 ERROR NOT FOUND</h1>
                        <span>Please return to the homepage.</span>
                    </div>
                }
            </div>
        )
    }
}

function mapStateToProps({ questions, users, authedUser }, props) {
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
        isAnswered,
        authedUser
	};
}


export default connect(mapStateToProps)(ChosenQuestion);