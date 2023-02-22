import http from 'k6/http';
import { check, sleep } from 'k6';
import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const URL = `http://localhost:3001`;

export function handleSummary(data) {
  return {
    'summary.html': htmlReport(data)
  }
};

export const options = {
  stages: [
    { duration: '1m', target: 500 },
    { duration: '1m', target: 1000 }
  ],
  thresholds: {
    http_req_failed: [{ threshold: 'rate <= 0.01'}],
    http_req_duration: ['p(99) < 150'], // 99% of reqs must complete below 150ms
    checks: ['rate>=0.99']
  },
};

export default function () {
  let id = Math.floor(Math.random() * 1000000) + 1;
  const requests = http.batch([
    ['GET', `${URL}/qa/questions?product_id=${id}`],
    ['GET', `${URL}/qa/questions/${id}/answers`]
  ]);
  check(requests[0], {
    'getQuestions status was 200': (res) => res.status === 200
  });
  check(requests[1], {
    'getAnswers status was 200': (res) => res.status === 200
  })
  sleep(1);
};
