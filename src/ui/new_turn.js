const form = document.querySelector('form')
const cancelBtn = document.querySelector('#cancel')

cancelBtn.addEventListener('click', () => {
  window.close()
})

form.addEventListener('submit', (event) => {
  event.preventDefault()
  const turnName = document.querySelector('#name').value
  const turnDate = document.querySelector('#date').value
  const date = new Date(turnDate)
  const newTurn = {
    name: turnName,
    date
  }
  window.api.send('turn:new', newTurn)
  window.api.receive('new_turn_created', (args) => {})
  window.api.receive('new_turn_error', (args) => {})
})
