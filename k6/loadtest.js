import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate, Trend } from 'k6/metrics';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

export const options = {
  thresholds: {
    http_req_failed: [{
      threshold: 'rate<=0.05',
      abortOnFail: true,
    }],
    http_req_duration: ['p(90) < 400', 'p(95) < 800', 'p(99.9) < 2000'],
    checks: ['rate>=0.99']
  },
};

const myRate = new Rate('my_rate');
const myTrend = new Trend('my_trend');

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data)
  }
}


export default function () {
  http.get('https://test.k6.io');
  sleep(1);

  myRate.add(true);
  myRate.add(false);
  myRate.add(1);
  myRate.add(0);

  myTrend.add(1);
  myTrend.add(2);
}


// Notes:
// scale from 1, 10, 100, up to 1000