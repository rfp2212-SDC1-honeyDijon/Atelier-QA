# Atelier Product Q&A API Service
Redesign and optimization of a backend system for an e-commerce web application.

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
### Questions
**GET / POST** `/qa/questions`
**PUT** `/qa/questions/:question_id/helpful`
**PUT** `/qa/questions/:question_id/report`

### Answers
**GET / POST** `/qa/questions/:question_id/answers`
**PUT** `/qa/answers/:answer_id/helpful`
**PUT** `/qa/answers/:answer_id/report`
