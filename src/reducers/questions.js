import { RECEIVE_QUESTIONS, SAVE_QUESTION, SAVE_ANSWER } from '../actions/questions';

export default function questions(state = {}, action) {
    switch(action.type) {
        case RECEIVE_QUESTIONS:
            return {
                ...state,
                ...action.questions
            }
        case SAVE_QUESTION:
            const { question } = action;

            return {
                ...state,
                [action.question.id]: question
            }
        case SAVE_ANSWER:
            const { qid, answer, authedUser } = action;

            return {
                ...state,
               [qid]: {
                    ...state[qid],
                    [answer]: {
                        ...state[qid][answer],
                        votes: state[qid][answer].votes.concat([authedUser])
                    }
                }
            }
        default: 
            return state;
    }
}