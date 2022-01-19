import { LIKE_STATE } from "../action";
const INITIAL_STATE = 0;

//mise à jour du state des likes
const likeState = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LIKE_STATE:
      return action.payload;   
    default:
      return state;
  }
};

export default likeState;
