import {GET_USERS} from "../action"
const INITIAL_STATE = {};

export default function usersCall(state = INITIAL_STATE, action)  {
    switch (action.type) {
      case GET_USERS:
        return  action.payload;     
      default:
        return state;
    } 
  };
  