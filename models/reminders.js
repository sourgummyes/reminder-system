const { Schema } = require('mongoose')

const reminderSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true}, 
        dateS: { type: Number, required: true},
        dateSE: { type: String, required: true},
        dateE: { type: Number, required: true},
        dateEE: { type: String, required: true},
        user_id: { type: Schema.Types.ObjectId, ref: 'user_id' }
    },
    {timestamps: true})

module.exports = reminderSchema