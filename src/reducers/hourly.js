import { ADD_HOURLY_FORECAST } from "../actions/hourly";

export default function hourlyPrediction(state = {}, action) {
  switch (action.type) {
    case ADD_HOURLY_FORECAST:
      return {
        ...state,
        ...action.hourly_prediction
      }
    default:
      return state;
  }
}
