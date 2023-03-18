# Atelier Product Q&A API Service
Redesign and optimization of a backend system for an e-commerce web application. Responsible for the Product Q&A microservice.

## Tech Stack <br>
<div align='left'>
<img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white' />
<img src='https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white' />
<img src='https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white' />
<img src='https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white' />
<img src='https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white' />
<img src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white' />
<img src='https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white' />
<img src='https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white' />
<img src='https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white' />
</div>

## API Endpoints <br>

### Questions <br>
**GET** `/qa/questions` retrieves a list of (non-reported) questions for a given product<br>
**POST** `/qa/questions` adds a question for a given product<br>
**PUT** `/qa/questions/:question_id/helpful` updates a question to show it was found helpful<br>
**PUT** `/qa/questions/:question_id/report` updates a question to show it was reported<br>

### Answers
**GET** `/qa/questions/:question_id/answers` retrieves a list of (non-reported) answers for a given question<<br>
**POST** `/qa/questions/:question_id/answers` adds an answer for a given question<br>
**PUT** `/qa/answers/:answer_id/helpful` updates an answer to show it was found helpful<br>
**PUT** `/qa/answers/:answer_id/report` updates an answer to show it was reported<br>

## Performance Summary & Stress Testing
| Metric | Goal | Achieved |
| --- | --- | --- |
| RPS | 1000 | 1000 for questions, 1500 for answers |
| Latency | <1s | 19ms for questions, 12ms for answers |
| Error rate | <1% | <1% for both questions and answers |

**Stress tested with loader.io, with bias on records within last 10% of dataset** <br>
GET questions `/qa/questions`<br>


<div align='left'>
  GET answers <code>/qa/questions/:question_id/answers</code><br>
<img src='https://user-images.githubusercontent.com/112139070/226143981-39c5515d-ea44-42db-99e2-c79f55c74237.png' width=50% />
</div>

## Optimizations <br>
**Server optimizations** <br>
- Horizontal scaling with 1 load balancer and 2 server instances (total of 3 AWS EC2 T2 micro instances)
- Load balancer configurations: `keepalive_requests` and Nginx caching


**Other optimizations** <br>
- Database optimizations with indices (query time <50ms)
- Server optimizations with Redis caching

