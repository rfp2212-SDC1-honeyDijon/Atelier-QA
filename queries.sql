-- sandbox

-- not very optimized due to slow return
WITH q AS (
  SELECT *
  FROM questions
  WHERE product_id = 40355 AND reported = FALSE
  ORDER BY questions.helpful DESC
  LIMIT 5
),
a AS (
  SELECT *
  FROM answers
  WHERE reported = FALSE
  ORDER BY answers.helpful DESC
),
p AS (
  SELECT *
  FROM photos
),
combo AS (
  SELECT *
  FROM q
  LEFT JOIN a on q.id = a.question_id
  LEFT JOIN p on a.id = p.answer_id
  ORDER BY q.helpful DESC
)

SELECT * FROM combo;

