const { model, Schema } = require('mongoose')
const Turn = require('./Turn')
const Payment = require('./Payment')

const newClientSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: null
  },
  birth: {
    type: Date,
    required: true
  },
  dni: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: null
  },
  so: {
    type: String,
    required: null
  },
  carnet: {
    type: String,
    required: null
  },
  phone: {
    type: String,
    required: null
  },
  email: {
    type: String,
    required: null
  },
  procedure: {
    type: String,
    required: null
  },
  estimate: {
    type: Number,
    required: false
  },
  turn: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: Turn
  },
  payment: {
    type: Schema.Types.ObjectId,
    required: false,
    ref: Payment
  }
})

module.exports = model('Client', newClientSchema)
