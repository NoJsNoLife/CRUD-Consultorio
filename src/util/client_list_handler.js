/* eslint-disable camelcase */
const Client = require('../models/Client')

let id = 0
let update = 1
let clients_list

async function updateClientListHandler () {
  try {
    clients_list = await Client.find()
    update++
  } catch (e) {
    console.error(e)
  }
}

async function getClientList () {
  if (id !== update) {
    await updateClientListHandler()
    id = update
  }
  return clients_list
}

module.exports = { updateClientListHandler, getClientList }
