import { GET_METRICS } from '../constants/actionTypes';
import querystring from 'querystring';
import { elasticsearchProxyHost } from '../config';

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

export function getData() {

  return async function foo(dispatch) {
    const query = querystring.stringify({
      query: btoa(JSON.stringify(canonicalQuery))
    });

    const response = await fetch(
      `http://${elasticsearchProxyHost}/data?${query}`
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
