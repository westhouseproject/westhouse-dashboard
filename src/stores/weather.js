import { GET_WEATHER } from '../constants/actionTypes';

export default function weather(state = null, action) {
  switch (action.type) {
  case GET_WEATHER:
    return action.data;
  default:
    return state;
  }
}
