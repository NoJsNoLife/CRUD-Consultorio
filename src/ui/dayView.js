/* eslint-disable no-unused-vars */
const backBtn = document.querySelector('#back')
const turnsTable = document.querySelector('#tableBody')

window.api.send('day:turns')
window.api.receive('day:turns', (Turns) => {
  const turns = JSON.parse(Turns)
  turns.forEach(turn => {
    const date = new Date(turn.date)
    const template = getTurnTemplate(date.getHours(), turn.name)
    turnsTable.insertAdjacentHTML('beforeend', template)
  })
})

const getTurnTemplate = (hour, name) => {
  const template = `
    <tr>
      <td>${hour}</td>
      <td>${name}</td>
    </tr>
  `
  return template
}

backBtn.addEventListener('click', () => {
  window.api.send('turns:list')
})
