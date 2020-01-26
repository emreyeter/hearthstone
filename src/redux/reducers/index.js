import { combineReducers } from 'redux';
import Reducer from './reducer';

export default combineReducers({
    hearthstone: Reducer,
})
