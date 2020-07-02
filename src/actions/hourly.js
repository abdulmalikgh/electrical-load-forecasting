export const ADD_HOURLY_FORECAST = "ADD_HOURLY_FORECAST";

export default function addHourlyPrediction(hourly_prediction) {
  return {
   type: ADD_HOURLY_FORECAST,
   hourly_prediction,
  };
}
