import {combineReducers} from 'redux';
import logged from './IsLogged'
import counter from './counter'
import apiCall from './apiCall';
import usersCall from './users';

export default combineReducers({
    logged,
    counter,
    apiCall,
    usersCall,
});

 
