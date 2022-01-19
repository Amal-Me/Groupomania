import { DELETE_PUBLICATION } from "../action";
import { DELETE_COMMENT } from "../action";
import { DELETE_USER } from "../action";
const INITIAL_STATE = {};

//mise à jour du state des suppressions
export default function deletePost(state = INITIAL_STATE, action) {
  switch (action.type) {
    case DELETE_PUBLICATION:
      return action.payload;
    case DELETE_COMMENT:
      return action.payload;
    case DELETE_USER:
      return action.payload;
    default:
      return state;
  }
}
