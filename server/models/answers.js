const db = require('../database/db.js');

const getAnswers = (req) => {
  const quesID = req.params.question_id;
  const count = req.query.count || 5;
  const page = req.query.page || 1;
  const offset = (page - 1) * count; // page in results is offset
  const query = `
    WITH a AS (
      SELECT *
      FROM answers
      WHERE question_id = $1 AND reported = FALSE
      ORDER BY helpful DESC
      LIMIT $2
      OFFSET $3
    ),
    p AS (
      SELECT
        id AS photo_id,
        answer_id,
        url
      FROM photos
      WHERE answer_id IN (SELECT id FROM a)
    )

    SELECT json_build_object(
      'question', $1,
      'page', $3,
      'count', $2,
      'results', (
        SELECT COALESCE (json_agg(json_build_object(
          'answer_id', a.id,
          'body', a.body,
          'date', a.date_written,
          'answerer_name', a.answerer_name,
          'helpfulness', a.helpful,
          'photos', (
            SELECT COALESCE (json_agg(json_build_object(
              'id', p.photo_id,
              'url', p.url
            )), '[]'::json)
            FROM p
          )
        )), '{}'::json)
        FROM a
      )
    )`;

  return db.query(query, [quesID, count, offset]);
};

const postAnswer = (req) => {
  const quesID = req.params.question_id;
  const body = req.body.body;
  const date = new Date().toISOString();
  const name = req.body.name;
  const email = req.body.email;
  const photos = req.body.photos;
  const query = `
    INSERT INTO answers (question_id, body, date_written, answerer_name, answerer_email, reported, helpful)
    VALUES ($1, $2, $3, $4, $5, $6, $7)
  `;
  const parameters = [quesID, body, date, name, email, false, 0];

  if (photos.length > 0) {
    const photoParams = parameters.concat([photos]);
    const photoQuery = `
      WITH new_ans AS (
        ${query}
        RETURNING id
      )
      INSERT INTO photos (answer_id, url)
      VALUES ((SELECT id FROM new_ans), UNNEST($8::text[]))
    `;

    return db.query(photoQuery, photoParams);
  }

  return db.query(query, parameters);
};

const markHelpfulAnswer = (req) => {
  const ansID = req.params.answer_id;
  const query = `
    UPDATE answers
    SET helpful = helpful + 1
    WHERE id = $1
  `;

  return db.query(query, [ansID]);
};

const reportAnswer = (req) => {
  const ansID = req.params.answer_id;
  const query = `
    UPDATE answers
    SET reported = TRUE
    WHERE id = $1
  `;

  return db.query(query, [ansID]);
};

module.exports = {
  getAnswers,
  postAnswer,
  markHelpfulAnswer,
  reportAnswer
};
