import { GET_UTILITY_DATA } from '../constants/actionTypes';
import querystring from 'querystring';
import { elasticsearchProxyHost } from '../config';

const energyConsumptionSeries = 'energy_consumption';
const solarPVSeries = 'solar_pv_power';
const intendedSeries = [energyConsumptionSeries, solarPVSeries];

function utilityUnion(consumption, production) {
  const hash = {};
  consumption.forEach((con) => {
    hash[con.id] = {
      consumption: con.value,
      time: con.date,
    };
  });
  production.forEach((prod) => {
    if (typeof hash[prod.id] === 'undefined') {
      hash[prod.id] = {
        production: -prod.value,
        consumption: 0,
        difference: prod.value,
        time: prod.date
      };
      return;
    }
    if (typeof hash[prod.id].consumption === 'undefined') {
      hash[prod.id].consumption = 0;
    }
    hash[prod.id].production = prod.value;
    hash[prod.id].difference = hash[prod.id].consumption + prod.value;
  });
  const merged = Object
    .keys(hash)
    .map(key => hash[key])
    .map(point => {
      if (typeof point.production === 'undefined') {
        return {
          ...point,
          production: 0,
          difference: point.consumption
        };
      }
      return point;
    })
    .sort((a, b) => a.time - b.time);

  return merged;
}

function getQueryForToday() {
  return btoa(JSON.stringify({
    query: { filtered: { filter: { range: { time: { gte: 'now-1d' } } } } },
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
  }));
}

function extractSeries(data, series) {
  const extracted = data.filter(metric => metric.series === series)[0];
  return extracted && extracted.values || [];
}

export async function getData() {
  const action = { type: GET_UTILITY_DATA, data: [] };

  try {
    const query = querystring.stringify({ query: getQueryForToday() });

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

    const combined = utilityUnion(
      extractSeries(parsed, energyConsumptionSeries),
      extractSeries(parsed, solarPVSeries)
    );

    return { ...action, data: combined };
  } catch (e) {
    console.error(e);
  }

  return action;
}
