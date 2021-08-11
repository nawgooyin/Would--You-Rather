import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleSaveQuestion } from '../actions/questions';

class NewQuestion extends Component {
    state = {
        optionOnetext: '',
        optionTwotext: ''
    }

    handleSubmit = (e) => {
        const { dispatch } = this.props;
        const { optionOnetext, optionTwotext } = this.state;

        e.preventDefault();

        dispatch(handleSaveQuestion(optionOnetext, optionTwotext))
            .then(() => {
                this.setState(() => ({
                    optionOnetext: '',
                    optionTwotext: ''
                }))

                this.props.history.push(`/home`);
            })
    }

    handleOptionOneChange = (e) => {
        const optionOnetext = e.target.value;

        if (!this.props.authedUser) {
            return alert('Please log in to create a new question');
        }

        this.setState(() => ({
            optionOnetext
        }))
    }

    handleOptionTwoChange = (e) => {
        const optionTwotext = e.target.value;

        if (!this.props.authedUser) {
            return alert('Please log in to create a new question');
        }

        this.setState(() => ({
            optionTwotext
        }))
    }

    render() {
        const { optionOnetext, optionTwotext } = this.state;

        return (
            <div>
                <h3>CreateNew Question</h3>
                <span>Complete the questions: </span>
                <br/>
                <br/>
                <form onSubmit={this.handleSubmit}>
                    <h4>Would you rather...</h4>
                    Option One: 
                    <input 
                        placeholder="Option One"
                        value={optionOnetext}   
                        onChange={this.handleOptionOneChange}
                    />
                    <br/><br/>OR<br/><br/>
                    Option Two: 
                    <input 
                        placeholder="Option Two"
                        value={optionTwotext}   
                        onChange={this.handleOptionTwoChange}
                    />
                    <br/><br/>
                    <button 
                        type='submit'
                        disabled={optionOnetext.length === 0 || optionTwotext.length === 0}>
                        Submit
                    </button>
                </form>
            </div>
        )
    }
}

function mapStateToProps({ authedUser }) {
	return {
        authedUser
	};
}

export default connect(mapStateToProps)(NewQuestion);