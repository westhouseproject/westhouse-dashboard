import { GET_METRICS } from '../constants/actionTypes';

export default function metrics(state = [], action) {
  switch (action.type) {
  case GET_METRICS:
    return action.data;
  default:
    return state;
  }
}
