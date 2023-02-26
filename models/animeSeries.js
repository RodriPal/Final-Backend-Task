const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const seriesSchema = new Schema({
  title: { type: String, required: true, lowercase: true },
  description: { type: String, required: true, lowercase: true },
  url: { type: String, required: true },
  category: { type: String, required: true },
  chapters: [{ type: Schema.Types.ObjectId, ref: "Chapters" }],
});

module.exports = mongoose.model("Series", seriesSchema);