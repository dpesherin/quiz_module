const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true},
    author: { type: String, required: true },
    targets: [{ type: String}],
    date: {type: Date, required: true}
})

module.exports = model('Quiz', schema)