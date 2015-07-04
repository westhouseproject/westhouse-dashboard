import { GET_UTILITY_DATA } from '../constants/actionTypes';

export default function utility(state = null, action) {
  switch (action.type) {
  case GET_UTILITY_DATA:
    return action.data;
  default:
    return state;
  }
}
