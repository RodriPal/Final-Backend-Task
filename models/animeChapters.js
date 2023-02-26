const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const chaptersSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    url: { type: String, required: true },
    serieOwner: { type: Schema.Types.ObjectId, ref: "Series" }
});

module.exports = mongoose.model("Chapters", chaptersSchema);