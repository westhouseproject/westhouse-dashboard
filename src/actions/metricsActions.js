import { GET_METRICS } from '../constants/actionTypes';
import querystring from 'querystring';
import { elasticsearchProxyHost } from '../config';

const intendedSeries = ['energy_consumption', 'solar_pv_power'];

export async function getData() {

  const action = { type: GET_METRICS, data: [] };

  try {
    const query = querystring.stringify({
      query: btoa(JSON.stringify({
        query: {
          filtered: {
            filter: {
              range: {
                time: {
                  gte: 'now-1d'
                }
              }
            },
          },
        },
        aggs: {
          series: {
            terms: { field: 'series' },
            aggs: {
              values: {
                'date_histogram': {
                  field: 'time',
                  interval: '1h'
                },
                aggs: {
                  consumption: {
                    avg: { field: 'value' }
                  }
                }
              }
            }
          }
        }
      }))
    });

    const response = await fetch(
      `http://${elasticsearchProxyHost}/jdbc/_search?${query}`
    );

    const data = await response.json();

    const parsed = data.aggregations.series.buckets
      .filter(series => intendedSeries.indexOf(series.key) >= 0)
      .map(
        series => ({
          series: series.key,
          values: series.values.buckets.map(point => ({
            id: point.key.toString(),
            date: new Date(point.key),
            value: point.consumption.value
          }))
        })
      );

    // dispatch({
    //   ...action,
    //   data: parsed
    // });
    return { ...action, data: parsed };
  } catch (e) {}

  return action;
  // return async function foo(dispatch) {
  // };
}
