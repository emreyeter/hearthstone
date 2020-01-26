

import {
    SET_CARDS,
    SET_MECHANICS
} from '../actions/types'

const INITIAL_STATE = {
    cards: [],
    mechanics: []
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {

        case SET_CARDS:
            return {
                ...state,
                cards: action.payload
            };


        case SET_MECHANICS:
            return {
                ...state,
                mechanics: action.payload
            };

        default:
            return state;
    }
};