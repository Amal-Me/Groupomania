import { GET_PUBLICATIONS } from "../action";
const INITIAL_STATE = [];

//met à jour le state des publications
export default function apiCall(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_PUBLICATIONS:
      return action.payload;
    default:
      return state;
  }
}
