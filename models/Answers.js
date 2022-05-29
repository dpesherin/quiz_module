const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    author: { type: String, required: true},
    question: { type: Types.ObjectId, ref: "Questions", required: true},
    selected: [{ type: String}]
})

module.exports = model('Answers', schema)