-- sandbox

-- idea 1: a super large table; not very optimized due to slow return
WITH q AS (
  SELECT *
  FROM questions
  WHERE product_id = 40355 AND reported = FALSE
  ORDER BY helpful DESC
  LIMIT 5
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
),
combo AS (
  SELECT *
  FROM q
  LEFT JOIN a ON q.id = a.ques_id
  LEFT JOIN p ON a.answer_id = p.ans_id
  ORDER BY helpful DESC
)

SELECT * FROM combo;

SELECT json_build_object(
  'product_id', 40355,
  'results', (
    SELECT json_agg(json_build_object(
      'question_id', id, --to fix ambiguous ID problem
      'question_body', body,
      'question_date', date_written,
      'asker_name', asker_name,
      'question_helpfulness', helpful,
      'reported', reported,
      'answers', (
        SELECT COALESCE (json_object_agg(
          id, json_buld_object(
            'id', id,
            'body', body,
            'date', date_written,
            'answerer_name', answerer_name,
            'helpfulness', helpful,
            'photos', (
              SELECT COALESCE (json_agg(photos.url), '[]'::json)
                FROM combo
            )
          )), '{}'::json) FROM combo)
    ))
    FROM combo
  )
);