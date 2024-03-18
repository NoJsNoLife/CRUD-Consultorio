/* eslint-disable camelcase */
const Turn = require('../models/Turn')

let currDay, currMonth, currYear

async function updateDate (day, month, year) {
  if (day === undefined || month === undefined || year === undefined) {
    throw new Error('Error en la definicion de la fecha')
  }
  try {
    currDay = day
    currMonth = month
    currYear = year
  } catch (e) {
    console.error(e)
  }
}

async function getTurnList () {
  if (currDay === undefined || currMonth === undefined || currYear === undefined) {
    throw new Error('Error en la definicion de la fecha')
  }
  const greaterThan = new Date(currYear, currMonth, currDay)
  const lessThan = new Date(currYear, currMonth, currDay + 1)
  const turns_list = await Turn.find({ date: { $gte: greaterThan, $lte: lessThan } })
  return turns_list
}

module.exports = { updateDate, getTurnList }
