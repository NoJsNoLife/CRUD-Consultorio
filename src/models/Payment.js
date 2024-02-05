const { model, Schema } = require('mongoose')

const newPaymentSchema = new Schema({
  date: {
    type: Object,
    required: true
  },
  method: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  }
})

module.exports = model('Payment', newPaymentSchema)
