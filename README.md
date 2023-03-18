# Atelier Product Q&A API Service
Redesign and optimization of a backend system for an e-commerce web application.

## Performance
| Metric | Goal | Achieved |
| --- | --- | --- |
| RPS | 1000 | 1000 for questions, 1500 for answers |
| Latency | <1s | 19ms for questions, 12ms for answers |
| Error rate | <1% | <1% |

## Tech Stack <br>
<div align='left'>
<img src='https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=JavaScript&logoColor=white' />
<img src='https://img.shields.io/badge/Node.js-339933.svg?style=for-the-badge&logo=nodedotjs&logoColor=white' />
<img src='https://img.shields.io/badge/Express-000000.svg?style=for-the-badge&logo=Express&logoColor=white' />
<img src='https://img.shields.io/badge/PostgreSQL-4169E1.svg?style=for-the-badge&logo=PostgreSQL&logoColor=white' />
<img src='https://img.shields.io/badge/Amazon%20AWS-232F3E.svg?style=for-the-badge&logo=Amazon-AWS&logoColor=white' />
<img src='https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white' />
<img src='https://img.shields.io/badge/Postman-FF6C37.svg?style=for-the-badge&logo=Postman&logoColor=white' />
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
