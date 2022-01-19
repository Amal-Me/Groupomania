import {combineReducers} from 'redux';
import apiCall from './apiCall';
import deletePost from './delete';
import likeState from './likeState';

//regroupement des reducers
export default combineReducers({
    apiCall,
    deletePost,
    likeState,
});

 
