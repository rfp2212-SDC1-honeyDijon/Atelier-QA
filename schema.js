// intentionally not requiring or creating mongoose connection
const qandaSchema = new mongoose.Schema({
  product_id: Number,
  question_id: {
    type: Number,
    unique: true
  },
  question_body: String,
  question_date: Date,
  asker_name: String,
  question_helpfulness: Number,
  reported: {
    type: Boolean,
    default: false
  },
  answers: {
    answer_id: {
      type: Number,
      unique: true
    },
    answer_body: String,
    answer_date: Date,
    answerer_name: String,
    answer_helpfulness: Number,
    reported: {
      type: Boolean,
      default: false
    },
    photos: {
      id: {
        type: Number,
        unique: true
      },
      url: String
    }
  }
});

const QandA = mongoose.model('QandA', qandaSchema);

module.exports.QandA = QandA;
