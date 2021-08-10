import { saveQuestionInfo, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const SAVE_ANSWER = 'SAVE_ANSWER';
export const SAVE_QUESTION = 'SAVE_QUESTION';

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions
    }
}

function saveQuestion(question) {
    return {
        type: SAVE_QUESTION,
        question
    }
}

function saveAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer
    }
}

export function handleSaveQuestion(questionOne, questionTwo) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

    return saveQuestionInfo({
        optionOneText: questionOne,
        optionTwoText: questionTwo,
        author: authedUser
    })
        .then((question) => dispatch(saveQuestion(question)))
        .then(() => dispatch(hideLoading()));
    }
}

export function handleSaveAnswer(qid, answer) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());

        return saveQuestionAnswer({
            authedUser,
            qid,
            answer
        })
        .then(() => dispatch(saveAnswer({ authedUser, qid, answer })))
        .then(() => dispatch(hideLoading()));
    }
}

