const { Schema } = require('mongoose')

const reminderSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String, required: true},
        dayS: { type: Number, required: true, max: 31 },
        monthS: { type: Number, required: true, max: 12},
        yearS: { type: Number, required: true },
        dayE: { type: Number, required: true, max: 31 },
        monthE: { type: Number, required: true, max: 12},
        yearE: { type: Number, required: true },
        user_id: { type: Schema.Types.ObjectId, ref: 'user_id' }
    },
    {timestamps: true})

module.exports = reminderSchema