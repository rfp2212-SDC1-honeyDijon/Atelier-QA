const db = require('../database/db.js');

const getQuestions = (prodID, count, offset) => {
  console.log('prodID', prodID);
  const query = `
    WITH q AS (
      SELECT *
      FROM questions
      WHERE product_id = $1 AND reported = FALSE
      ORDER BY helpful DESC
      LIMIT $2
      OFFSET $3
    ),
    a AS (
      SELECT
        id AS answer_id,
        question_id AS ques_id,
        body AS ans_body,
        date_written AS ans_date,
        answerer_name,
        answerer_email,
        reported AS ans_reported,
        helpful AS ans_helpful
      FROM answers
      WHERE question_id IN (SELECT id FROM q)
      ORDER BY ans_helpful DESC
    ),
    p AS (
      SELECT
        id AS photo_id,
        answer_id AS ans_id,
        url
      FROM photos
      WHERE answer_id IN (SELECT answer_id FROM a)
    )

    SELECT json_build_object(
      'product_id', $1,
      'results', (
        SELECT json_agg(json_build_object(
          'question_id', q.id,
          'question_body', q.body,
          'question_date', q.date_written,
          'asker_name', q.asker_name,
          'question_helpfulness', q.helpful,
          'reported', q.reported,
          'answers', (
            SELECT COALESCE (json_object_agg(
              a.answer_id, json_build_object(
                'id', a.answer_id,
                'body', a.ans_body,
                'date', a.ans_date,
                'answerer_name', a.answerer_name,
                'helpfulness', a.ans_helpful,
                'photos', (
                  SELECT COALESCE (json_agg(p.url), '[]'::json)
                    FROM p
                )
              )), '{}'::json) FROM a)
        ))
        FROM q
      )
  )`

  // returns a promise from db.query
  return db.query(query, [prodID, count, offset]);
    // .then((data) => {
    //   console.log('data', data.rows[0]);
    //   // returns the data from db.query
    //   return data.rows[0];
    // })
    // .catch((err) => console.error('error', err));
};

module.exports = {
  getQuestions
};
