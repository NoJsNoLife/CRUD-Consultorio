const { model, Schema } = require('mongoose')

const newTurnSchema = new Schema({
    name: {
        type: Object,
        required: true
    },
    date: {
        type: Date,
        required: true,
    },
});

module.exports = model('Turn', newTurnSchema)