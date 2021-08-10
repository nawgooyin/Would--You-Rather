import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    render() {
        const { question, users, isReadOnly, isAnswered, showResultAnswers } = this.props;

        return (
            <div className='question-info'>
                <span>Asked by: {users[question.author]?.name}</span><br/>
                <button 
                    disabled={isReadOnly || isAnswered === 'true'}
                    onClick={() => showResultAnswers('optionOne')}>
                    Option 1: {question.optionOne?.text}
                </button><br/>
                <button 
                    disabled={isReadOnly || isAnswered === 'true'}
                    onClick={() =>showResultAnswers('optionTwo')}>
                    Option 2: {question.optionTwo?.text}
                </button><br/>
                {isReadOnly && 
                    <Link to={`/questions/${question.id}/${isAnswered}`}>
                        <button>View Poll</button>
                    </Link>
                }
            </div>       
        )
    }
}

export default Question;