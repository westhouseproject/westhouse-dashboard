import { GET_WEATHER } from '../constants/actionTypes';

function kelvinToCelcius(temperature) {
  return temperature - 273.15;
}

export async function getData() {
  const action = { type: GET_WEATHER, data: null };

  try {
    const response = await fetch(
      'http://api.openweathermap.org/data/2.5/weather?q=Vancouver,CA'
    );

    const data = await response.json();

    return {
      ...action,
      data: {
        overview: data.weather[0].main,
        simplifiedCode: data.weather[0].icon,
        temperature: kelvinToCelcius(data.main.temp)
      }
    };
  } catch (e) { console.error(e); }

  return action;
}
