import http from 'k6/http';
import { check, sleep } from 'k6';
// import { htmlReport } from 'https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js';

const last10Percent = Math.floor(1000011 * 0.1);
const product_id = Math.floor(Math.random() * last10Percent) + (1000011 - last10Percent);


const URL = `http://localhost:3001`;

// export function handleSummary(data) {
//   return {
//     'summary.html': htmlReport(data)
//   }
// };

export const options = {
  stages: [
    { duration: '1m', target: 500 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 0 }
  ],
  thresholds: {
    http_req_failed: [{ threshold: 'rate <= 0.01'}],
    http_req_duration: ['p(99) < 2000'], // 99% of reqs must complete below 150ms
    checks: ['rate>=0.99']
  },
};

export default function () {
  // let id = Math.floor(Math.random() * 1000000) + 1;
  const requests = http.batch([
    ['GET', `${URL}/qa/questions?product_id=${product_id}`],
    // ['GET', `${URL}/qa/questions/${id}/answers`]
  ]);
  check(requests[0], {
    'getQuestions status was 200': (res) => res.status === 200
  });
  // check(requests[1], {
  //   'getAnswers status was 200': (res) => res.status === 200
  // })
  sleep(1);
};
