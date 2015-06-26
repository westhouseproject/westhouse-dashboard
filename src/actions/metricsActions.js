import { GET_METRICS } from '../constants/actionTypes';
import querystring from 'querystring';

const canonicalQuery = {
  aggs: {
    values: {
      'date_histogram': {
        field: 'time',
        interval: '1d',
        format: 'yyyy-MM-dd'
      },
      aggs: {
        consumption: {
          avg: { 'field': 'value' }
        }
      }
    }
  }
};

// TODO: hard code the URL into a settings file instead of here.
// const host = '142.58.183.207:5000';
const host = 'localhost:4000';

export function getData() {

  return async function foo(dispatch) {
    const query = querystring.stringify({
      query: btoa(JSON.stringify(canonicalQuery))
    });

    const response = await fetch(
      `http://${host}/data?${query}`
    );

    const data = await response.json();

    if (
      !data.aggregations ||
      !data.aggregations.values ||
      !data.aggregations.values.buckets
    ) {
      dispatch({ type: GET_METRICS, data: [] });
      return;
    }

    dispatch({ type: GET_METRICS, data: data.aggregations.values.buckets });
  };

}
