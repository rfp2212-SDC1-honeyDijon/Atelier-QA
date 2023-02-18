const db = require('../database/db.js');

const getQuestions = (prodID, count, page) => {
  const query = `
    SELECT json_build_object(
      'product_id', ${prodID},
      'results', (
        WITH q AS (
          SELECT *
          FROM questions
          WHERE product_id = $1 AND reported = false
          ORDER BY helpful DESC
          LIMIT $2
        )
      )
  )`

  db.query(query, [prodID, count])
};

module.exports = {
  getQuestions
};


// GET /qa/questions Retrieves a list of questions for a particular product. This list does not include any reported questions.

// json_agg() aggregates to array

// TO DO:
// how to handle selected page (default set to 1)