import { GET_METRICS } from '../constants/actionTypes';

export default function metrics(state = null, action) {
  // console.log(action);
  switch (action.type) {
  case GET_METRICS:
    return action.data;
  default:
    return state;
  }
}
