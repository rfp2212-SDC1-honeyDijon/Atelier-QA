import http from 'k6/http';
import { check, sleep } from 'k6';

const data = {
  totalProdIDs: 1000000,
  totalQuesIDs: 3500000,
  last10product: Math.floor(1000011 * 0.1),
  last10question: Math.floor(3500000 * 0.1)
}
const prodID = Math.floor(Math.random() * data.last10product) + (data.totalProdIDs - data.last10product);
const quesID = Math.floor(Math.random() * data.last10question) + (data.totalQuesIDs - data.last10question);

const URL = `http://localhost:3001`;

export const options = {
  stages: [
    { duration: '1m', target: 500 },
    { duration: '1m', target: 700 },
    { duration: '1m', target: 0 }
  ],
  thresholds: {
    http_req_failed: [{ threshold: 'rate <= 0.01'}], // error rate < 1%
    http_req_duration: ['p(99) < 2000'], // 99% of reqs must complete below 2ss
    checks: ['rate>=0.99']
  },
};

export default function () {
  const requests = http.batch([
    ['GET', `${URL}/qa/questions?product_id=${prodID}`],
    ['GET', `${URL}/qa/questions/${quesID}/answers`]
  ]);
  check(requests[0], {
    'getQuestions status was 200': (res) => res.status === 200
  });
  check(requests[1], {
    'getAnswers status was 200': (res) => res.status === 200
  })
  sleep(1);
};
