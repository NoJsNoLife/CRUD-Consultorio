/* eslint-disable camelcase */
const Turn = require('../models/Turn')

let id = 0
let update = 1
let turns_list

async function updateTurnListHandler () {
  try {
    turns_list = await Turn.find()
    update++
  } catch (e) {
    console.error(e)
  }
}

async function getTurnList () {
  if (id !== update) {
    await updateTurnListHandler()
    id = update
  }
  return turns_list
}

module.exports = { updateTurnListHandler, getTurnList }
