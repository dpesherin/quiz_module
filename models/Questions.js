const { Schema, model, Types } = require('mongoose')

const schema = new Schema({
    title: { type: String, required: true},
    type: { type: String, required: true},
    multi: {type: Boolean, required: true},
    options: [{ type: String}],
    quiz: {type: Types.ObjectId, required: true, ref: 'Quiz'}
})

module.exports = model('Questions', schema)