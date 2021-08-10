import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Question extends Component {
    answerQuestion = () => {
       console.log('k');
    }

    render() {
        const { question, users, isReadOnly, isAnswered } = this.props;

        return (
            <div className='question-info'>
                <span>Asked by: {users[question.author]?.name}</span><br/>
                <button 
                    disabled={isReadOnly || isAnswered === 'true'}
                    onClick={() => this.answerQuestion()}>
                    Option 1: {question.optionOne?.text}
                </button><br/>
                <button 
                    disabled={isReadOnly || isAnswered === 'true'}
                    onClick={() => this.answerQuestion()}>
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