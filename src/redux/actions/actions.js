import { SET_CARDS, SET_MECHANICS } from '../actions/types';
export function setCards(val) {
    return {
        type: SET_CARDS,
        payload: val
    }
}

export function setMechanics(val) {
    return {
        type: SET_MECHANICS,
        payload: val
    }
}